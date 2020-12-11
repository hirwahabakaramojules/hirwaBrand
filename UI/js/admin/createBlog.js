var firebaseConfig = {
    apiKey: "AIzaSyB25XlauyLSyrv6-FOq4scHxofKfuXzHhw",
    authDomain: "hirwahjules-520b8.firebaseapp.com",
    databaseURL: "https://hirwahjules-520b8.firebaseio.com",
    projectId: "hirwahjules-520b8",
    storageBucket: "hirwahjules-520b8.appspot.com",
    messagingSenderId: "1014276523246",
    appId: "1:1014276523246:web:1cd8452cec429ff05d9fff",
    measurementId: "G-5PXYFR30WJ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const blogId = document.location.search.replace(/^.*?\=/, "");
  const title = document.getElementById("title");
  const body = document.getElementById("body");
  const submitBtn = document.getElementById("sub-btn");
  const firebaseStorage = firebase.storage();
  if (blogId){
      db.collection("blogs").doc(blogId).get().then(snap =>{
          const thumbnailLabel = document.getElementById("thumbnail-label");
          const thumbnail = document.getElementById("thumbnail");
          let imageUrl = snap.data().image;
          title.value = snap.data().blogTitle;
          body.value = snap.data().blogBody;
          submitBtn.textContent = "update blog";
          thumbnailLabel.textContent = "update thumbnail";

         thumbnail.addEventListener("change", e =>{
             const  storageRef = firebaseStorage.ref(`thumbnails/${thumbnail.name}`);
             storageRef.put(thumbnail).on("state_changed", snap =>{
                const progress = (snap.bytesTransferred / snap.totalBytes) * 100;
                console.log(progress);
            }, err => console.log(err), async () => {
                const url = await storageRef.getDownloadURL()
                imageUrl = url;
                    })
          submitBtn.addEventListener("click", (e) =>{
              e.preventDefault();
              db.collection("blogs").doc(blogId).set({
                  blogTitle : title.value,
                  blogBody : body.value,
                  image : imageUrl
              });
              console.log("updated")
              setTimeout(()=>{
                   window.location = "/UI/pages/admin/admin.html"
              },3000 )
             
          })
      })
  })
  }
  