if (Meteor.isClient) {
  // counter starts at 0
  // Session.setDefault("counter", 0);

  // Template.canvas.helpers({
  //   blocks: function () {
  //     return Blocks.find();
  //   }
  // });  
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    // if (Blocks.find().count() === 0) { 
    //   Blocks.insert({
    //     nounCase: "nominative",
    //     nounGender: "feminine",
    //     nounPlural: false,
    //     content: "puella"});
    // }
  });
} 
