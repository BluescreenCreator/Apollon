document
  .querySelector(".uploadThumbnail")
  .addEventListener("change", function (e) {
    console.log(e);
    var audio = e.target.files[0];
    var databaseRef = firebase.database().ref();
    var storageRef = firebase
      .storage()
      .ref(
        document.querySelector(".uploadSongName").value +
          "_" +
          document.querySelector(".uploadGenreName").value +
          "/Thumbnail"
      );
    var task = storageRef.put(audio);
    task.on("state_changed", function progress(snapshot) {
      console.log((snapshot.bytesTransferred / audio.size) * 100 + "%");
      document.querySelector("#thumbnailUpload").value =
        (snapshot.bytesTransferred / audio.size) * 100;
    });
  });

  document.querySelector(".uploadMusic").addEventListener("change", function (e) {
    console.log(e);
    var audio = e.target.files[0];
    var databaseRef = firebase.database().ref();
    var storageRef = firebase
      .storage()
      .ref(
        document.querySelector(".uploadSongName").value +
          "_" +
          document.querySelector(".uploadGenreName").value +
          "/Audio"
      );
  
    var task = storageRef.put(audio);
    databaseRef
      .child("MusicFileNames")
      .push(
        document.querySelector(".uploadSongName").value +
          "_" +
          document.querySelector(".uploadGenreName").value
      );
      
    task.on("state_changed", function progress(snapshot) {
      console.log((snapshot.bytesTransferred / audio.size) * 100 + "%");
      document.querySelector("#audioUpload").value =
        (snapshot.bytesTransferred / audio.size) * 100;
    });
  });
