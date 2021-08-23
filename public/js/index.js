function showAll(element){
    content = element.children[1]
    if (content.style.display === "none" || content.style.display===''){
        content.style.display = "block"
    }
    else {
        content.style.display = "none"
    }
}
