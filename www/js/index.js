/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
          var onSuccess = function(position) {
           console.log("hello")
         };

         // onError Callback receives a PositionError object
         //
         function onError(error) {
             alert('code: '    + error.code    + '\n' +
                   'message: ' + error.message + '\n');
         }

         navigator.geolocation.getCurrentPosition(onSuccess, onError);
        var w = window.open('https://woolies-to-go.herokuapp.com/login','_blank','location=no,zoom=no');
        w.addEventListener('exit', function () {
                navigator.app.exitApp();
            });

		  w.addEventListener('loadstart', function(event)
        {
          var options = { dimBackground: true };
          SpinnerPlugin.activityStart("Loading...", options);
		    });

		  w.addEventListener('loadstop', function(event)
        {
          SpinnerPlugin.activityStop();
		    });

        console.log('calling push init');
          var push = PushNotification.init({
              "android": {
                  "senderID": "672065826034",
                  "icon" : "logo.png"
              },
              "browser": {},
              "ios": {
                  "sound": true,
                  "vibration": true,
                  "badge": true
              },
              "windows": {}
          });
          console.log('after init');

          push.on('registration', function(data) {
              console.log('registration event: ' + data.registrationId);
              var oldRegId = localStorage.getItem('registrationId');
              if (oldRegId !== data.registrationId) {
                  // Save new registration ID
                  localStorage.setItem('registrationId', data.registrationId);
                  // Post registrationId to your app server as the value has changed
                  console.log('registration event: ' + data.registrationId);
              }

              var parentElement = document.getElementById('registration');
              var listeningElement = parentElement.querySelector('.waiting');
              var receivedElement = parentElement.querySelector('.received');

              listeningElement.setAttribute('style', 'display:none;');
              receivedElement.setAttribute('style', 'display:block;');
          });

          push.on('error', function(e) {
              console.log("push error = " + e.message);
          });

          push.on('notification', function(data) {
              console.log('notification event');
              navigator.notification.alert(
                  data.message,         // message
                  null,                 // callback
                  data.title,           // title
                  'Ok'                  // buttonName
              );
         });

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
