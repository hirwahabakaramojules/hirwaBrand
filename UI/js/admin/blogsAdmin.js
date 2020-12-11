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
  const adminBlogTable = document.getElementById("admin-blog-table")
  

  db.collection("blogs").onSnapshot(snapshot =>{
      let changes = snapshot.docChanges();
      changes.forEach(change =>{
          if (change.type === "added"){
              const tr = document.createElement("tr");
              const titleTd = document.createElement("td");
              const btnTd = document.createElement("td");
              const a = document.createElement("a");
              const btn = document.createElement("button");

              a.innerHTML = "edit";
              btn.innerHTML = "delete";
              titleTd.innerHTML = change.doc.data().blogTitle;
              btnTd.appendChild(a);
              btnTd.appendChild(btn);
              tr.appendChild(titleTd);
              tr.appendChild(btnTd);
              tr.setAttribute("blogId", change.doc.id);
              adminBlogTable.appendChild(tr);
              btn.addEventListener("click", e =>{
                  e.stopPropagation();
                  const sure = confirm("are you sure you want to delete this blog?")
                  if(sure){
                    const targetBlogId = btn.parentElement.parentElement.getAttribute("blogId");
                  db.collection("blogs").doc(targetBlogId).delete();
                  }
                                 
              })

              a.addEventListener("click", e =>{
                  e.stopPropagation();
                  const targetBlogId = a.parentElement.parentElement.getAttribute("blogId");
                  window.location = "/UI/pages/admin/createBlog.html" + "?blogIdentity=" + targetBlogId;
              })
          } else if (change.type === "removed"){
              const removedTr = adminBlogTable.querySelector('[blogId=' + change.doc.id +']');
              adminBlogTable.removeChild(removedTr);
          }
      })
  })