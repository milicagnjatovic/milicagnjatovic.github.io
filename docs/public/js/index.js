/*
TESTING
RUN local server in folder: python3 -m http.server 8000
in browser: http://localhost:8000/
*/
function showAll(element){
    content = element.children[1]
    if (content.style.display === "none" || content.style.display===''){
        content.style.display = "block"
    }
    else {
        content.style.display = "none"
    }
}

function loadJSON(){
    var el = document.getElementById("projects")
    fetch('./resources/projects.json?vr=1.0') // vr=1.0 da bi se video najnoviji fajl
    .then(response => response.json())
    .then(data => {
        console.log(data)
        for(let i=0; i<data.project.length; i++){
            var main_div = document.createElement("div")
            main_div.className = "project"
            main_div.onclick = function() {showAll(this);}

            var div_title = document.createElement("h1")
            div_title.className = "project_title"
            var title = document.createTextNode(data.project[i].title)
            div_title.appendChild(title)

            var div_content = document.createElement("div")
            div_content.className = "project_content"

            var text_tag = document.createElement("p")
            var text = document.createTextNode(data.project[i].text)
            text_tag.appendChild(text)

            var link_tag = document.createElement("a")
            link_tag.href = data.project[i].link
            link_tag.text = "Više..."

            var img_tag = document.createElement("img")
            img_tag.src = data.project[i].image
        
            div_content.appendChild(text_tag)
            div_content.appendChild(link_tag)
            div_content.appendChild(img_tag)

            main_div.appendChild(div_title)
            main_div.appendChild(div_content)

            el.appendChild(main_div)
        }
    })
    .catch(error => console.log(error))
}