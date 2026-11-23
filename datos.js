// Datos de la web que se pueden cambiar sin tocar el resto: enlaces, formulario, cartas, hoja de ruta y preguntas.
// Cada texto va en español (es) y en inglés (en).

// Enlaces (vacío = el botón sale en gris con «muy pronto»)
window.ENLACES = {
	discord: "https://discord.gg/GAE96e7tmc",
	youtube: "https://www.youtube.com/@Clonafusi%C3%B3n",
	contacto: "contacto@clonafusion.com",  // (correo o web de contacto para prensa; vacío = no sale)
};

// Formulario de testers: las respuestas van a un Google Form (y de ahí a su hoja de cálculo).
// accion: la dirección del formulario acabada en /formResponse
// campos: el número «entry.XXXX» de cada pregunta (salen del enlace «prellenado» del Google Form)
// Si accion está vacío, el formulario avisa de que aún no está abierto.
window.FORMULARIO = {
	accion: "https://docs.google.com/forms/d/e/1FAIpQLSdrt35_ntlVs1rkQ5Fi11S0LwWC9KaeZfTtOM3hZG3muzXofg/formResponse",
	campos: { correo: "entry.1994140115", movil: "entry.498876601", experiencia: "entry.142176984", pais: "entry.1259757356", novedades: "entry.397633382" },
};

// Fase del playtest (la etiqueta de arriba y la hoja de ruta)
window.FASE = { es: "Playtest cerrado · Android", en: "Closed playtest · Android" };

// Cartas del inspector: lo táctico de cada una (los números y el efecto vienen del juego: cartas.json)
window.CARTAS = {
	"bombero.cabeza": {
		nombre: { en: "Firefighter Helmet" },
		efecto: { en: "Gains Taunt for 1 round. Takes 10% less damage this round." },
		efecto2: { en: "Gives 30% of its shield to adjacent allies." },
		escala: { es: "Su escudo crece con la vida del clon: cuanto más aguanta, más protege.", en: "Its shield grows with the clone's health: the tougher it is, the more it protects." },
		sinergia: { es: "Con Cuidadores detrás: él atrae los golpes y ellos curan.", en: "With Carers behind: it draws the hits while they heal." },
		riesgo: { es: "Atrae todos los ataques: si se queda sin escudo, cae el primero.", en: "Draws every attack: if its shield breaks, it falls first." },
	},
	"medico.arma": {
		nombre: { en: "Stethoscope" },
		efecto: { en: "Heals as much as the damage it deals." },
		efecto2: { en: "Applies Exposed to the target for 1 round." },
		escala: { es: "Más ataque = más curación: en un combo largo se recupera mucho.", en: "More attack = more healing: in a long combo it recovers a lot." },
		sinergia: { es: "Con cartas que dan ataque o críticos a todo el equipo.", en: "With cards that boost attack or crits for the team." },
		riesgo: { es: "Si el rival tiene mucho escudo, apenas cura.", en: "Against heavy shields it barely heals." },
	},
	"futbolista.calzado": {
		nombre: { en: "Cleats" },
		efecto: { en: "If faster than the target: 130% damage." },
		efecto2: { en: "If faster than the target: hits twice." },
		escala: { es: "Premia la velocidad: sube la del clon y el golpe se dispara.", en: "Rewards speed: raise the clone's speed and the hit skyrockets." },
		sinergia: { es: "Con Speed Up o contra rivales con Speed Down.", en: "With Speed Up, or against foes with Speed Down." },
		riesgo: { es: "Contra un rival más rápido es un golpe normal.", en: "Against a faster foe it's just a normal hit." },
	},
	"detective.muneca": {
		nombre: { en: "Pocket Watch" },
		efecto: { en: "Draws 1 card." },
		efecto2: { en: "In a combo: the foe discards 1 random card." },
		escala: { es: "Cada carta extra es más opciones en la ronda siguiente.", en: "Every extra card means more options next round." },
		sinergia: { es: "Con cartas caras: robas lo que necesitas para el gran combo.", en: "With expensive cards: draw what you need for the big combo." },
		riesgo: { es: "Poco daño: si el rival aprieta, gastas energía sin presionar.", en: "Low damage: under pressure, you spend energy without hitting back." },
	},
	"soldado.arma": {
		nombre: { en: "Assault Rifle" },
		efecto: { en: "Hits 3 times." },
		efecto2: { en: "Hits 2 times. Ignores shields." },
		escala: { es: "Tres golpes = tres oportunidades de crítico.", en: "Three hits = three chances to crit." },
		sinergia: { es: "Ideal contra el último aliento: cada golpe le quita un tramo.", en: "Great against last stand: each hit removes a tick." },
		riesgo: { es: "Cada golpe es flojo: un buen escudo lo frena.", en: "Each hit is weak: a strong shield stops it." },
	},
	"cocinero.cabeza": {
		nombre: { en: "Chef Hat" },
		efecto: { en: "Heals 45 health to the whole team." },
		efecto2: { en: "Its team gains Regen for 1 round." },
		escala: { es: "Cura a los tres a la vez: cuanto más largo el combate, más vale.", en: "Heals all three at once: the longer the fight, the more it's worth." },
		sinergia: { es: "No golpea, así que sirve para quitar el último tramo al rival en último aliento sin gastar tus ataques.", en: "It doesn't attack, so it can take the last tick off a foe in last stand without wasting your attacks." },
		riesgo: { es: "No hace daño: usarla demasiado da tiempo al rival.", en: "It deals no damage: overusing it gives your foe time." },
	},
};

// Por qué probarlo ahora
window.PORQUE = [
	{ n: "36", es: ["profesiones jugables", "chico y chica, cada una con 4 cartas y su versión de nivel 2"], en: ["playable professions", "boy and girl, each with 4 cards and their level 2 version"] },
	{ n: "6", es: ["mundos de historia", "con sus jefes, para conseguir tus primeros clones"], en: ["story worlds", "with their bosses, to earn your first clones"] },
	{ n: "3v3", es: ["Arena en directo", "contra otras personas, con copas y ligas"], en: ["live Arena", "against real people, with trophies and leagues"] },
	{ n: "∞", es: ["clonafusiones", "cada hijo es distinto: tu equipo no se parece a ningún otro"], en: ["clonefusions", "every child is different: no team looks like yours"] },
];

// Hoja de ruta: hecho / ahora / después
window.RUTA = [
	{ estado: "hecho", es: ["Modo historia", "6 mundos, jefes, tablero y búnker"], en: ["Story mode", "6 worlds, bosses, board and bunker"] },
	{ estado: "hecho", es: ["Clonafusión y evolución", "hijos con 7 piezas, niveles hasta 70 y cartas de nivel 2"], en: ["Clonefusion and evolution", "children with 7 pieces, levels up to 70 and level 2 cards"] },
	{ estado: "ahora", es: ["Playtest cerrado", "equilibrio de las cartas, Arena en directo y ranking"], en: ["Closed playtest", "card balance, live Arena and ranking"] },
	{ estado: "despues", es: ["Temporadas y torneos", "premios por liga cada temporada"], en: ["Seasons and tournaments", "league rewards every season"] },
	{ estado: "despues", es: ["Lanzamiento en Google Play", "gratis para jugar"], en: ["Google Play launch", "free to play"] },
];

// Preguntas frecuentes
window.FAQ = [
	{ es: ["¿Cuánto dura una partida?", "Un combate de la Arena dura unos 3-5 minutos. Un viaje del modo historia, unos 10."], en: ["How long is a match?", "An Arena fight takes about 3-5 minutes. A story mode run, about 10."] },
	{ es: ["¿Qué necesito para probarlo?", "Un móvil Android (7 o más reciente) y una cuenta de Google para recibir la invitación de Google Play."], en: ["What do I need?", "An Android phone (7 or newer) and a Google account to get the Google Play invite."] },
	{ es: ["¿Es gratis?", "Sí. El playtest es gratis y el juego será gratis para jugar."], en: ["Is it free?", "Yes. The playtest is free and the game will be free to play."] },
	{ es: ["¿Cómo informo de fallos?", "En el Discord, en el canal de fallos, con una captura y qué estabas haciendo."], en: ["How do I report bugs?", "On the Discord, in the bugs channel, with a screenshot and what you were doing."] },
	{ es: ["¿Mi progreso se guardará?", "Durante el playtest puede que haya que empezar de cero alguna vez para probar cambios."], en: ["Will my progress be saved?", "During the playtest we may need to reset progress now and then to test changes."] },
	{ es: ["¿Lleva NFT o criptomonedas?", "No. Clonafusión es un juego normal: sin NFT y sin criptomonedas."], en: ["Does it have NFTs or crypto?", "No. Clonafusión is a regular game: no NFTs, no crypto."] },
];
