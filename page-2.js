let posts = [];
let onDelete = [];
fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((json) => {
        posts = json;
        const id = window.location.href.split("?")[1].split("=")[1];
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].userId == id) {
                console.log(posts[i]);
                const temp = document.createElement("div");
                temp.className = "postCard";
                temp.id = posts[i].id;
                const checkBox = document.createElement("input");
                checkBox.type = "checkbox";
                checkBox.className = "checkbox";
                checkBox.onclick = function () {
                    if (this.checked) {
                        onDelete.push(this.parentNode.id);
                    } else {
                        onDelete.splice(
                            onDelete.indexOf(this.parentNode.id),
                            1
                        );
                    }
                    console.log(onDelete);
                };
                temp.appendChild(checkBox);
                const title = document.createElement("h1");
                const body = document.createElement("p");
                title.innerHTML = "Title: " + posts[i].title;
                body.innerHTML = "Body: " + posts[i].body;
                temp.appendChild(title);
                temp.appendChild(body);
                const commentTitle = document.createElement("h2");
                commentTitle.innerHTML = "Comments";
                temp.appendChild(commentTitle);
                fetch(
                    "https://jsonplaceholder.typicode.com/comments?postId=" +
                        posts[i].id
                )
                    .then((response) => response.json())
                    .then((json) => {
                        for (let j = 0; j < 3; j++) {
                            const comment = document.createElement("div");
                            const name = document.createElement("h3");
                            const email = document.createElement("p");
                            const body = document.createElement("p");
                            name.innerHTML = "Name: " + json[j].name;
                            email.innerHTML = "Email: " + json[j].email;
                            body.innerHTML = "Body: " + json[j].body;
                            comment.appendChild(name);
                            comment.appendChild(email);
                            comment.appendChild(body);
                            temp.appendChild(comment);
                        }
                    });
                temp.appendChild(document.createElement("hr"));
                const postsDiv = document.querySelector(".postsSection");
                postsDiv.appendChild(temp);
            }
        }
    });

function deletePosts() {
    for (let i = 0; i < onDelete.length; i++) {
        let temp = document.getElementById(onDelete[i]);
        temp.parentNode.removeChild(temp);
    }
    
    alert(`${onDelete.length}  posts will be delete`);
    onDelete = [];
}
const deleteButton = document.querySelector(".deleteButton");
deleteButton.onclick = deletePosts;
