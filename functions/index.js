'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const config = functions.config();
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const fs = require('fs');
const cors = require('cors')({origin: true});
var uploadkey = "12345";

app.use(fileUpload());
app.use(cors);
admin.initializeApp(config.firebase);

//Pläne werden hochgeladen und in die Datenbank hochgeladen

app.post('/planupload', function(request, response){
	if (!request.files){
		return response.status(400).send('No files were uploaded.');
	}

	if (request.headers.uploadkey !== uploadkey){
		return response.status(301).send('Passwort inkorrekt!');
	}

	console.log("Data:" + request.files.plan.data.toString());
	console.log("Data:" + request.files.plan2.data.toString());

	var myplan = request.files.plan.data.toString();
	var myplan2 = request.files.plan2.data.toString();

	var nofree = "<p align=\"left\"><h2><strong>Keine Freistunden/Vertretung!</strong></h2></p>";
	var fuenf = "Klasse: 05";
	var sechs = "Klasse: 06";
	var sieben = "Klasse: 07";
	var acht = "Klasse: 08";
	var neun = "Klasse: 09";
	var ef = "Kopplung/Kurs: EF";
	var q1 = "Kopplung/Kurs: Q1";
	var q2 = "Kopplung/Kurs: Q2";
	var foe6 = "FÖ6";
	var foe7 = "FÖ7";
	var foe8 = "FÖ8";
	var lfs6 = "LFS6";
	var lfs7 = "LFS7";
	var lfs8 = "LFS8";
	var lfs9 = "LFS9";
	var r7 = "Kopplung/Kurs: R7";
	var r8 = "Kopplung/Kurs: R8";
	var r9 = "Kopplung/Kurs: R9";
	var sef = "SEF";
	var sq1 = "SQ1";
	var sq2 = "SQ2";
	var th1 = "TH1";
	var th2 = "TH2";
	var w5foe = "W5FÖ";
	var xef = "XEF";
	var xq1 = "XQ1";
	var xq2 = "XQ2";
	var zk = "ZK1Q2";
	var fwe6 = "Kopplung/Kurs: FWE6";
	var di8 = "Kopplung/Kurs: 8DI1";
	var bezeichnungen = [fuenf, sechs, sieben, acht, neun, ef, foe6, foe7, foe8, lfs6, lfs7, lfs8, lfs9, q1, q2, r7, r8, r9, sef, sq1, sq2, th1, th2, w5foe, xef, xq1, xq2, zk, fwe6, di8];
	var updates = {};

	function setzeplan(privateplan, day){

		var vertretungsplaene = new Array(30);
		var positionen = [];

		bezeichnungen.forEach(function(name){
			positionen.push(privateplan.indexOf(name));
		});

		positionen.push(privateplan.length);

		var positionenfiltered = positionen.filter(function checkminus(pos){
			return pos > -1;
		});

		var cnt = 0;

		bezeichnungen.forEach(function(name, index){
			vertretungsplaene[index] = new Object();
			vertretungsplaene[index].Kurs = name;
			if(positionen[index] === -1){
				vertretungsplaene[index].Plan = "";
			}else{
				vertretungsplaene[index].Plan = "<strong>" + privateplan.substring(positionenfiltered[cnt], positionenfiltered[cnt+1]);
				cnt++;
			}
		});

		var vertfuenf = vertretungsplaene[0].Plan;
		var vertsechs = vertretungsplaene[1].Plan.concat(vertretungsplaene[6].Plan, vertretungsplaene[9].Plan, vertretungsplaene[28].Plan);
		var vertsieben = vertretungsplaene[2].Plan.concat(vertretungsplaene[7].Plan, vertretungsplaene[10].Plan, vertretungsplaene[15].Plan);
		var vertacht = vertretungsplaene[3].Plan.concat(vertretungsplaene[8].Plan, vertretungsplaene[11].Plan, vertretungsplaene[16].Plan, vertretungsplaene[29].Plan);
		var vertneun = vertretungsplaene[4].Plan.concat(vertretungsplaene[12].Plan, vertretungsplaene[17].Plan);
		var vertef = vertretungsplaene[5].Plan.concat(vertretungsplaene[18].Plan, vertretungsplaene[24].Plan);
		var vertq1 = vertretungsplaene[13].Plan.concat(vertretungsplaene[19].Plan, vertretungsplaene[25].Plan);
		var vertq2 = vertretungsplaene[14].Plan.concat(vertretungsplaene[20].Plan, vertretungsplaene[26].Plan, vertretungsplaene[27].Plan);
		var plaenepost = [vertfuenf, vertsechs, vertsieben, vertacht, vertneun, vertef, vertq1, vertq2];

		plaenepost.forEach(function(name, index){
			if(plaenepost[index] === ""){
				plaenepost[index] = nofree;
			}
		});

	    updates['/vertretungsplan/' + day + '/5'] = plaenepost[0];
		updates['/vertretungsplan/' + day + '/6'] = plaenepost[1];
		updates['/vertretungsplan/' + day + '/7'] = plaenepost[2];
		updates['/vertretungsplan/' + day + '/8'] = plaenepost[3];
		updates['/vertretungsplan/' + day + '/9'] = plaenepost[4];
		updates['/vertretungsplan/' + day + '/10'] = plaenepost[5];
		updates['/vertretungsplan/' + day + '/11'] = plaenepost[6];
		updates['/vertretungsplan/' + day + '/12'] = plaenepost[7];
	};

	setzeplan(myplan, "heute");
	setzeplan(myplan2, "morgen");


	admin.database().ref().update(updates);

	response.send("Vertretungsplan geupdated");
});

//Checkt ob der Key bei der Registrierung korrekt ist

app.post('/checkkey', function(req, res){
	const sentkey = req.body.key;
	console.log(sentkey);
	console.log(req);
	function mysende(mydbkeys){
		res.set({
	 		'Access-Control-Allow-Credentials': true
 		});
		res.status(200).send(mydbkeys.includes(sentkey));
	};
	var dbkeys = admin.database().ref('/keys/').once('value').then(function (snapshot) {
		var obj = snapshot.val();
		var dbkeys = Object.keys(obj).map(function (key) { return obj[key]; });
		mysende(dbkeys);
	});
});

exports.egmapp = functions.https.onRequest(app);

//Cleant die Userdaten bei Löschung eines Accounts

exports.cleanupUserData = functions.auth.user().onDelete(event => {
  const uid = event.data.uid;
  return admin.database().ref(`/users/${uid}`).remove(), admin.database().ref(`/settings/${uid}`).remove();
});



exports.setStufe = functions.database.ref('/users/{userId}/stufenkey')
    .onWrite(event => {
      // Grab the current value of what was written to the Realtime Database.
      const stufenkey = event.data.val();
      console.log('Setze Stufe', event.params.userId, stufenkey);

			function checkmykey(mykey){
				return mykey === stufenkey;
			};

			function writetodb(i){
				return event.data.ref.parent.child('stufe').set(i + 5);
			};

			function setstufe(mydbkeys){
				mydbkeys.some(function (s, i, o) {
					if(checkmykey(s) === true){
						writetodb(i);
						return true;
					} else {
						return false;
					}
				});
			};

			admin.database().ref('/keys/').once('value').then(function (snapshot) {
				var obj = snapshot.val();
				var dbkeys = Object.keys(obj).map(function (key) { return obj[key]; });
				setstufe(dbkeys);
			});

    });
