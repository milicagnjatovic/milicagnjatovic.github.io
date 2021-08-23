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

            var div_title = document.createElement("div")
            div_title.className = "project_title"
            var title = document.createTextNode(data.project[i].title)
            div_title.appendChild(title)

            var div_text = document.createElement("div")
            div_text.className = "project_content"
            var text = document.createTextNode(data.project[i].text)
            div_text.appendChild(text)

            main_div.appendChild(div_title)
            main_div.appendChild(div_text)

            el.appendChild(main_div)
        }
    })
    .catch(error => console.log(error))
}