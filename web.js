// Web de Clonafusión: idioma (ES/EN), inspector de cartas, personajes por clase, cifras, hoja de ruta, preguntas,
// formulario de testers (a un Google Form) y el vídeo del tráiler. Los datos que se editan están en datos.js.

const CLASES = [
	{ id: "protector", es: ["Protectores", "Aguantan golpes y protegen a los suyos"], en: ["Protectors", "Tank hits and protect allies"] },
	{ id: "cuidador", es: ["Cuidadores", "Curan, regeneran y duermen al rival"], en: ["Carers", "Heal, regenerate and put foes to sleep"] },
	{ id: "deportista", es: ["Deportistas", "Rápidos y con golpes a distancia"], en: ["Athletes", "Fast, with ranged attacks"] },
	{ id: "mente", es: ["Mentes", "Energía, robar cartas y controlar el turno"], en: ["Minds", "Energy, card draw and turn control"] },
	{ id: "rudo", es: ["Rudos", "Fuerza bruta, críticos y moral alta"], en: ["Bruisers", "Brute force, crits and high morale"] },
	{ id: "artista", es: ["Artistas", "Trucos, veneno y estados molestos"], en: ["Artists", "Tricks, poison and nasty effects"] },
];
const EN = {
	obrero: "Builder", bombero: "Firefighter", policia: "Police officer", vigilante: "Guard", guardaespaldas: "Bodyguard",
	agente_de_transito: "Traffic officer", cartero: "Postman", conserje: "Janitor", rescatista: "Rescuer", salvavidas: "Lifeguard",
	medico: "Doctor", jardinero: "Gardener", buzo: "Diver", portero_de_futbol: "Goalkeeper", arbitro: "Referee",
	jugador_de_futbol_americano: "Football player", futbolista: "Soccer player", ciclista: "Cyclist", astronauta: "Astronaut",
	cientifico: "Scientist", astronomo: "Astronomer", fotografo: "Photographer", detective: "Detective", piloto_de_avion: "Pilot",
	portero_de_discoteca: "Bouncer", soldado: "Soldier", minero: "Miner", lenador: "Lumberjack", marinero: "Sailor", vaquero: "Cowboy",
	cocinero: "Chef", payaso: "Clown", mago: "Magician", malabarista: "Juggler", vendedor_de_globos: "Balloon seller", mariachi: "Mariachi",
};
const T = {
	es: { escala: "Cómo escala", sinergia: "Combina con", riesgo: "Riesgo", nv2: "Nivel 2", energia: "Energía", ataque: "Ataque", escudo: "Escudo",
		distancia: "A distancia", cuerpo: "Cuerpo a cuerpo", hecho: "Hecho", ahora: "Ahora", despues: "Después",
		enviando: "Enviando…", sinform: "El formulario abre muy pronto. Mientras, únete al Discord.", fallo: "No se pudo enviar. Inténtalo de nuevo." },
	en: { escala: "How it scales", sinergia: "Pairs with", riesgo: "Risk", nv2: "Level 2", energia: "Energy", ataque: "Attack", escudo: "Shield",
		distancia: "Ranged", cuerpo: "Melee", hecho: "Done", ahora: "Now", despues: "Next",
		enviando: "Sending…", sinform: "The form opens very soon. Meanwhile, join the Discord.", fallo: "Couldn't send. Please try again." },
};

let idioma = "es";
let sexo = "chico";
let personajes = [];
let cartas = [];
let elegida = 0;

const leer = (k, d) => { try { return localStorage.getItem(k) || d; } catch (e) { return d; } };
const guardar = (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* (sin almacenamiento: no pasa nada) */ } };
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const tx = (o) => (o && (o[idioma] ?? o.es)) || "";

function ponerIdioma(i) {
	idioma = i;
	document.documentElement.lang = i;
	document.querySelectorAll("[data-es]").forEach((el) => { el.textContent = el.dataset[i]; });
	document.getElementById("idioma").textContent = i === "es" ? "EN" : "ES";
	document.getElementById("fase").textContent = tx(window.FASE);
	pintarCartas();
	pintarPersonajes();
	pintarListas();
	guardar("idioma", i);
}

// ---------------------------------------------------------------- cartas

function textoCarta(c, campo) {
	const extra = (window.CARTAS || {})[c.id] || {};
	return idioma === "en" && extra[campo] && extra[campo].en ? extra[campo].en : c[campo];
}

function htmlCarta(c, nv2 = false) {
	const atq = nv2 && c.ataque2 != null ? c.ataque2 : c.ataque;
	const esc_ = nv2 && c.escudo2 != null ? c.escudo2 : c.escudo;
	const efecto = textoCarta(c, nv2 ? "efecto2" : "efecto");
	return `<div class="carta${nv2 ? " nv2" : ""}" style="--color:var(--${c.clase})">
		<div class="carta-arte" style="background-image:url(img/cartas/fondo_${c.profesion}.webp)">
			<img src="img/cartas/${c.profesion}_${c.tipo}.webp" alt="" loading="lazy">
		</div>
		<span class="carta-energia" aria-label="${T[idioma].energia}">${c.energia}</span>
		<img class="carta-clase" src="img/cartas/clase_${c.clase}.webp" alt="">
		${nv2 ? `<span class="carta-nv2">★ Nv 2</span>` : ""}
		<span class="carta-nombre">${esc(textoCarta(c, "nombre"))}</span>
		<p class="carta-efecto">${esc(efecto)}</p>
		<span class="carta-ataque" aria-label="${T[idioma].ataque}">${atq}</span>
		<span class="carta-escudo" aria-label="${T[idioma].escudo}">${esc_}</span>
	</div>`;
}

function pintarCartas() {
	const mazo = document.getElementById("mazo");
	if (!cartas.length) return;
	mazo.innerHTML = cartas.map((c, k) => `<button class="hueco${k === elegida ? " activa" : ""}" role="listitem" data-k="${k}"
		aria-pressed="${k === elegida}" aria-label="${esc(textoCarta(c, "nombre"))}">${htmlCarta(c)}</button>`).join("");
	mazo.querySelectorAll(".hueco").forEach((b) => {
		b.addEventListener("click", () => { elegida = +b.dataset.k; pintarCartas(); });
	});
	pintarDetalle();
}

function pintarDetalle() {
	const c = cartas[elegida];
	const x = (window.CARTAS || {})[c.id] || {};
	const cl = CLASES.find((k) => k.id === c.clase);
	const t = T[idioma];
	document.getElementById("detalle").innerHTML = `
		<p class="detalle-clase" style="color:var(--${c.clase})">${esc(cl[idioma][0])} · ${c.distancia ? t.distancia : t.cuerpo}</p>
		<h3>${esc(textoCarta(c, "nombre"))}</h3>
		<dl class="tactica">
			<div><dt>${t.escala}</dt><dd>${esc(tx(x.escala))}</dd></div>
			<div><dt>${t.sinergia}</dt><dd>${esc(tx(x.sinergia))}</dd></div>
			<div class="riesgo"><dt>${t.riesgo}</dt><dd>${esc(tx(x.riesgo))}</dd></div>
		</dl>
		${c.efecto2 ? `<div class="detalle-nv2"><p><b>${t.nv2}:</b> ${esc(textoCarta(c, "efecto2"))}</p><div class="marco-carta">${htmlCarta(c, true)}</div></div>` : ""}`;
}

// ---------------------------------------------------------------- personajes

function pintarPersonajes() {
	const caja = document.getElementById("clases");
	if (!personajes.length) return;
	caja.innerHTML = CLASES.map((c) => {
		const [nombre, rol] = c[idioma];
		const caras = personajes.filter((x) => x.clase === c.id).map((p) => {
			const s = sexo === "chica" && p.chica ? "chica" : "chico";
			const n = idioma === "en" ? (EN[p.id] || p.nombre) : p.nombre;
			return `<figure class="cara"><img src="img/caras/${p.id}_${s}.webp" alt="" loading="lazy"><figcaption>${esc(n)}</figcaption></figure>`;
		}).join("");
		return `<div class="clase" style="--color:var(--${c.id})"><h3>${nombre}</h3><p class="rol">${rol}</p><div class="caras">${caras}</div></div>`;
	}).join("");
}

// ---------------------------------------------------------------- cifras, ruta y preguntas

function pintarListas() {
	const t = T[idioma];
	document.getElementById("cifras").innerHTML = (window.PORQUE || []).map((p) => {
		const [titulo, texto] = p[idioma];
		return `<div class="cifra"><span class="numero">${esc(p.n)}</span><b>${esc(titulo)}</b><p>${esc(texto)}</p></div>`;
	}).join("");
	document.getElementById("lista-ruta").innerHTML = (window.RUTA || []).map((r) => {
		const [titulo, texto] = r[idioma];
		return `<li class="r-${r.estado}"><span class="estado">${t[r.estado]}</span><b>${esc(titulo)}</b><p>${esc(texto)}</p></li>`;
	}).join("");
	document.getElementById("lista-faq").innerHTML = (window.FAQ || []).map((f) => {
		const [p, r] = f[idioma];
		return `<details><summary>${esc(p)}</summary><p>${esc(r)}</p></details>`;
	}).join("");
}

// ---------------------------------------------------------------- enlaces y formulario

function enlaces() {
	const E = window.ENLACES || {};
	document.querySelectorAll("[data-enlace]").forEach((a) => {
		const url = E[a.dataset.enlace];
		if (url) {
			a.href = url.includes("@") && !url.startsWith("mailto:") ? "mailto:" + url : url;
		} else if (a.dataset.enlace === "contacto") {
			a.hidden = true;
		} else {
			a.classList.add("apagado");
			a.removeAttribute("href");
			a.setAttribute("aria-disabled", "true");
			a.title = idioma === "es" ? "Muy pronto" : "Coming soon";
		}
	});
}

function formulario() {
	const form = document.getElementById("form");
	const aviso = document.getElementById("aviso-form");
	const comprobar = (id, ok) => {
		document.getElementById("e-" + id).hidden = ok;
		document.getElementById("f-" + id).setAttribute("aria-invalid", String(!ok));
		return ok;
	};
	form.addEventListener("submit", async (e) => {
		e.preventDefault();
		const correo = document.getElementById("f-correo").value.trim();
		const movil = document.getElementById("f-movil").value.trim();
		const bien = [comprobar("correo", /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo)), comprobar("movil", movil.length >= 2)];
		if (bien.includes(false)) {
			form.querySelector('[aria-invalid="true"]').focus();
			return;
		}
		const F = window.FORMULARIO || {};
		aviso.hidden = false;
		aviso.className = "aviso-form";
		if (!F.accion) {
			aviso.textContent = T[idioma].sinform;
			return;
		}
		const boton = document.getElementById("enviar");
		boton.disabled = true;
		boton.classList.add("cargando");
		aviso.textContent = T[idioma].enviando;
		const datos = new FormData();
		const C = F.campos || {};
		const poner = (campo, valor) => { if (C[campo]) datos.append(C[campo], valor); };
		poner("correo", correo);
		poner("movil", movil);
		poner("experiencia", form.experiencia.value);
		poner("pais", document.getElementById("f-pais").value.trim());
		poner("novedades", document.getElementById("f-novedades").checked ? "Si" : "No");  // (las opciones del Google Form: «Si» y «No»)
		try {
			// (Google Forms no deja leer la respuesta desde otra web: si la petición sale, se da por enviada)
			await fetch(F.accion, { method: "POST", mode: "no-cors", body: datos });
			form.hidden = true;
			document.getElementById("hecho").hidden = false;
		} catch (err) {
			aviso.textContent = T[idioma].fallo;
			aviso.className = "aviso-form mal";
		} finally {
			boton.disabled = false;
			boton.classList.remove("cargando");
		}
	});
}

// ---------------------------------------------------------------- vídeo del tráiler (el opening se descubre al instalar el juego)

function trailer() {
	const modal = document.getElementById("modal");
	const video = document.getElementById("video-trailer");
	const cerrar = () => { video.pause(); modal.hidden = true; document.getElementById("ver-trailer").focus(); };
	document.getElementById("ver-trailer").addEventListener("click", () => {
		const src = "video/trailer_" + idioma + ".mp4";
		if (!video.src.endsWith(src)) video.src = src;
		modal.hidden = false;
		video.currentTime = 0;
		video.play().catch(() => {});
		document.getElementById("cerrar").focus();
	});
	document.getElementById("cerrar").addEventListener("click", cerrar);
	modal.addEventListener("click", (e) => { if (e.target === modal) cerrar(); });
	document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) cerrar(); });
}

// ---------------------------------------------------------------- arranque

document.getElementById("idioma").addEventListener("click", () => ponerIdioma(idioma === "es" ? "en" : "es"));
document.querySelectorAll(".sexo button").forEach((b) => b.addEventListener("click", () => {
	sexo = b.dataset.sexo;
	document.querySelectorAll(".sexo button").forEach((x) => {
		x.classList.toggle("activo", x === b);
		x.setAttribute("aria-pressed", String(x === b));
	});
	pintarPersonajes();
}));

Promise.all([
	fetch("personajes.json").then((r) => r.json()).catch(() => []),
	fetch("cartas.json").then((r) => r.json()).catch(() => []),
]).then(([p, c]) => { personajes = p; cartas = c; pintarPersonajes(); pintarCartas(); });
enlaces();
formulario();
trailer();
ponerIdioma(leer("idioma", (navigator.language || "es").startsWith("es") ? "es" : "en"));
