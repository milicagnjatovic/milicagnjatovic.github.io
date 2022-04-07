let okBnt = document.getElementById("okBtn");
let instructions = document.getElementById("instructions")
if(okBnt != null && instructions != null){
    okBnt.onclick = function() {
        instructions.style.display="none"
    }
}

let score_el = document.getElementById('score');
let score = -10
let korak = 1
let board_size = 76;
let characters = [
    "./resources/emoji1.png","./resources/emoji2.png","./resources/emoji3.png","./resources/emoji4.png"
]

let table = document.querySelector('table')
let changeBtn = document.getElementById('changeBtn')

function change_character(){
    this.style.display = "none"
    table.style.display = "block"
}

function new_game(){
    player.x=0;
    player.y=0;
    player.move();
    score=-10;
    target.move()
}

let character_options = document.querySelectorAll('table#characters tr td')
// console.log(character_options)
for(let option of character_options){
    option.onclick = choosen_character
}

function choosen_character(event){
    console.log(this.id)
    let index = Number.parseInt(this.id)
    console.log(player.el.style.backgroundImage)
    player.el.style.backgroundImage = 'url("' + characters[index] + '"'
    console.log(player.el.style.backgroundImage)
    table.style.display = "none"
    changeBtn.style.display = "block"
}



let target = {
    el: document.getElementById("target"),
    x:0,
    y:0,
    move: function(){
        score += 10
        score_el.textContent = score

        this.x = Math.floor(Math.random() * board_size)
        this.y = Math.floor(Math.random() * board_size)
        this.el.style.left = this.x + 'vh'
        this.el.style.top = this.y + 'vh'
    }
}

target.move()

let player = {
    x:0,
    y: 0,
    el: document.getElementById("square"),
    move: function(){
        this.el.style.left = this.x + 'vh'
        this.el.style.top = this.y + 'vh'
    }
}

if(player.el!=null && target.el!=null && score_el !=null && table!=null && changeBtn!=null){
    document.addEventListener('keydown', function(){
        switch(event.code){
            case 'ArrowDown': player.y+=korak; break;
            case 'ArrowUp': player.y -= korak; break;
            case 'ArrowLeft': player.x-=korak; break;
            case 'ArrowRight': player.x += korak; break;
            default: return;
        }
    if(player.x<0)
        player.x = 0;
    if(player.y<0)
        player.y = 0;
    if(player.x>board_size)
        player.x = board_size;
    if(player.y>board_size)
        player.y = board_size;

    player.move();
    check();
    })

    changeBtn.onclick = change_character
} else {
    console.log('somethin is null')
}

function check(){
    if(Math.abs(player.x-target.x)<5 && Math.abs(player.y - target.y)<5)
        target.move()
}