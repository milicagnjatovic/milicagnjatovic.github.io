function loadClassFromJSON(elId, classFile){
    let el = document.getElementById(elId)
    fetch(classFile) // vr=1.0 da bi se video najnoviji fajl
    .then(response => response.json())
    .then(data => {
        for(let zadatak of data.zadaci){
            console.log(zadatak)
            let item = document.createElement('li');

            let tekstZadatka = document.createElement('p');
            tekstZadatka.className = "zadatak";
            tekstZadatka.textContent = zadatak.z;
            item.appendChild(tekstZadatka);

            for(let resenje of zadatak.r){
                let r = document.createElement('p');
                r.innerHTML = resenje;
                r.className = 'kod';
                // let text = document.createTextNode(resenje);
                // r.appendChild(text);
                item.appendChild(r);
            }

            if(zadatak.n != ''){
                let napomena = document.createElement('p')
                napomena.textContent = zadatak.n;
                item.appendChild(napomena);
            }
            el.appendChild(item);
        }
    })
    .catch(error => console.log(error))
}