// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCQv8ET4kFkI0hr5luI8Qn3dh0Q2jIAdgo",
    authDomain: "aquacollector-database.firebaseapp.com",
    projectId: "aquacollector-database",
    storageBucket: "aquacollector-database.appspot.com",
    messagingSenderId: "487430716655",
    appId: "1:487430716655:web:844d1819a40c2150aa6f1a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

const docRef = firestore.doc("aquacollector-data/pi-data");
var latitude = 20;
var longitude = 0;

docRef.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        const myData = doc.data();
        latitude = myData.coordinates.latitude;
        longitude = myData.coordinates.longitude;

        //Map stuff
        var center = SMap.Coords.fromWGS84(longitude, latitude);
        var m = new SMap(JAK.gel("m"), center, 13);
        m.addDefaultLayer(SMap.DEF_BASE).enable();
        m.addDefaultControls();

        var sync = new SMap.Control.Sync({bottomSpace:0}); //Makes map fill th whole screen
        m.addControl(sync);

        var layer = new SMap.Layer.Marker(); //Adds marker
        m.addLayer(layer);
        layer.enable();

        var card = new SMap.Card();
        card.getBody().innerHTML = "Tu znajduje się aquacollector"; //Card body text

        var options = {
            //title: "Dobré ráno" //Display on mouse hover
        };
        var marker = new SMap.Marker(center, "AcuacollectorPosition", options);
        marker.decorate(SMap.Marker.Feature.Card, card);
        layer.addMarker(marker);


    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

//Add map stuff here