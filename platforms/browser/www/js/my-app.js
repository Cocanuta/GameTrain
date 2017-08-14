// Initialize app
var myApp = new Framework7({
    modalTitle: 'GameTrain',
    material: true,
    preprocess: loadDatabase()
});


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main');

var db = null;

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
});

function loadDatabase() {
    db = sqlitePlugin.openDatabase({name: 'gametrain.db'});
}



// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('daily', function (page) {
    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM Challenges', [], function(tx, rs) {
            console.log(rs.rows.item(0));
        }, function(tx, error) {
            console.log('SELECT error: ' + error.message);
        });
    });

});