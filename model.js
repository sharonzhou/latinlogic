// Latin Logic Thesis -- data model
// Loaded on both the client and the server

/*
	Noun
		word: 		string
		declension: 1, 2, 3, 4, 5
		iStem: 		true, false*
		gender: 	feminine, masculine, neuter, none*
					--> color
		nounCase: 	nominative, genitive, dative, accusative, ablative, vocative, locative
					--> general shape, all edges
		number: 	singular, plural
					--> right edge
		person: 	first, second, third, none*
					--> right edge
		pronoun: 	personal, reflexive, possessive, demonstrative, relative, interrogative, indefinite, none*

		svg naming: noun-case-number-gender/person.svg, 
			eg. noun-nominative-singular-none.svg is 'ego',
			noun-nominative-singular-feminine.svg is 'puella'
*/
Noun = function(word, declension, iStem, gender, nounCase, number, person, pronoun) {
	this.word = word;
	this.declension = declension;
	this.iStem = iStem;
	this.gender = gender;
	this.nounCase = nounCase;
	this.number = number;
	this.person = person;
	this.pronoun = pronoun;

	// private detection variables for snapping
	// intuitive? "looking for a singular verb"
	// simple? assign + and - #s to edges & vicinity of contact, if sum to 0, then can snap together
}

Noun.prototype = {
	constructor: Noun,
	showParse: function () {
		console.log(this.word, this.nounCase, this.number, this.gender);
		return [this.nounCase, this.number, this.gender];
	},

	// TO DO: add parameters for position x y
	createPuzzlePiece: function(paper) {
		// determine block color
		var description = this.gender;
		if (this.gender == "none") {
			description = this.person;
		}

		// load block
		var block = paper.image("noun-" + this.nounCase + "-" + this.number + "-" + description + ".svg");
		var blockWidth = 121, blockHeight = 73;
		var blockX = block.getBBox().cx;
		var blockY = block.getBBox().cy;
		console.log(blockX, blockY);
		console.log(block.getBBox());
		console.log(this.node.getBoundingClientRect());

		// load text
		var word = paper.image("words/" + this.word + ".svg");
		var wordWidth = 47, wordHeight = 31;
		word.transform("t" + (blockWidth - wordWidth) / 2 + "," + (blockHeight - wordHeight) / 2);

		// merge block and text
		var puzzlePiece = paper.g(block, word);
		return puzzlePiece;

		// TO DO: vary size of rectangular base, based on text width / change text width accordingly


		// load base color - varies by gender
		// var base = paper.image("noun-base-" + this.gender + ".svg");

		// // 1st, 2nd, 3rd person pronouns
		// if (this.person == "first") {
		// 	// join oval path
		// } else if (this.person == "second") {
		// 	// 
		// } else if (this.person == "third") {
		// 	//
		// }
	}
}

/*
	Noun PlanB
		word: 	string
		edges: 	array containing all areas and edges of snappage, each represented by a non-zero term
*/
NounB = function(word, edges) {
	this.word = word;
	this.edges = edges;
}

NounB.prototype = {
	constructor: NounB,

	// should be called when event listener fires 'puzzle piece nearby' event
	verifySnap: function(seekerEdge) {
		for (var i = 0; i < this.edges.length; i++) {
			if (this.edges[i] + seekerEdge == 0) {
				// it's a match!
				return true;
			}
		}
		return false;
	}
}

/* 
	Verb
		word: 	string
		mood: 	indicative, subjunctive, interrogative
		number: singular, plural
		person: 1, 2, 3
		tense: 	present, imperfect, future, perfect, pluperfect, future perfect
		voice: 	active, passive
*/
function Verb (word, mood, number, person, tense, voice) {
	this.word = word;
	this.mood = mood;
	this.number = number;
	this.person = person;
	this.tense = tense;
	this.voice = voice;
}

Verb.prototype = {
	constructor: Verb,
	showParse: function () {
		console.log(this.word, this.mood, this.number, this.person, this.tense, this.voice);
		return [this.mood, this.number, this.person, this.tense, this.voice];
	},

	createPuzzlePiece: function(paper) { }
}

/*
	Adjective
		word: 		string
		adjCase: 	nominative, genitive, dative, accusative, ablative, vocative, locative
		declension: 1, 2, 3, 4, 5
		iStem: 		true, false
		gender: 	feminine, masculine, neuter, none
					--> color
		number: 	singular, plural


*/
Adjective = function(word, adjCase, declension, iStem, gender, number) {
	this.word = word;
	this.declension = declension;
	this.iStem = iStem;
	this.gender = gender;
	this.nounCase = nounCase;
	this.number = number;
}

/* 
	Adverb
		word: 	string
		degree: positive, comparative, superlative
*/
function Adverb (word, degree) {
	this.word = word;
	this.degree = degree;
}

/* 
	Preposition
		word: 		string
		prepCase: 	accusative, ablative
*/
function Preposition (word, prepCase) {
	this.word = word;
	this.prepCase = prepCase;
}

/* 
	Conjunction
		word: 		string
		enclitic: 	true, false
*/
function Conjunction (word, enclitic) {
	this.word = word;
	this.enclitic = enclitic;
}

// /*
//   Each block is represented by a document in the Blocks collection:
//     content: all words;
//     declinedCase: nouns, adjectives;
//     number: nouns, verbs, adjectives;
//     gender: noun, adjectives
// */
// Blocks = new Mongo.Collection("blocks");

// {
// 	content: "puella";
// 	declinedCase: "nominative";
// 	number: "singular";
// 	gender: "feminine";
// },

// { 
// 	content: "puellae";
// 	declinedCase: "nominative";
// 	number: "plural";
// 	gender: "feminine";
// },

// {
// 	content: "ego";
// 	declinedCase: "nominative";
// 	number: "singular";
// 	gender: "none";
// 	person: 1;
// },

// {
// 	content: "laboro";
// 	person: 1;
// 	number: "singular";
// 	tense: "present";
// 	mood: "indicative";
// 	voice: "active";
// },

// {
// 	content: "laborat";
// 	person: 3;
// 	number: "singular";
// 	tense: "present";
// 	mood: "indicative";
// 	voice: "active";
// },

// {
// 	content: "laborant";
// 	person: 3;
// 	number: "plural";
// 	tense: "present";
// 	mood: "indicative";
// 	voice: "active";
// }