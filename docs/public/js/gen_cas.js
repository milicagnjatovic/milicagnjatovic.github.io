function loadClassFromJSON(elId, classFile){
    let root = document.getElementById(elId)
    fetch(classFile) // vr=1.0 da bi se video najnoviji fajl
    .then(response => response.json())
    .then(data => {
        let naslov1 = document.createElement("h3");
        naslov1.textContent = "Zadaci";
        root.appendChild(naslov1)

        let zadaciOL = document.createElement("ol");
        for(let zadatak of data.zadaci){
            // console.log(zadatak)
            let item = document.createElement('li');

            let tekstZadatka = document.createElement('p');
            tekstZadatka.className = "zadatak";
            tekstZadatka.innerHTML = zadatak.z;
            item.appendChild(tekstZadatka);

            let resenjaDiv = document.createElement('div');
            item.append(resenjaDiv);
            resenjaDiv.style.display = 'none'

            let showBtn = document.createElement('button');
            showBtn.textContent = 'rešenje';
            showBtn.className = 'resenje_btn'
            item.append(showBtn);

            showBtn.onclick = function(){
                if (resenjaDiv.style.display === 'block'){
                    resenjaDiv.style.display = 'none';
                    showBtn.textContent = 'rešenje';
                } else {
                    resenjaDiv.style.display = 'block';
                    showBtn.textContent = 'sakrij rešenje';    
                }
            }

            for(let resenje of zadatak.r){
                let r = document.createElement('p');
                r.innerHTML = resenje;
                r.className = 'kod';
                resenjaDiv.appendChild(r);
                // item.appendChild(r);
            }

            if("n" in zadatak){
                let napomena = document.createElement('p')
                napomena.innerHTML = zadatak.n;
                resenjaDiv.appendChild(napomena);
            }
            zadaciOL.appendChild(item);
        }
        root.appendChild(zadaciOL);

        let vezbanjeDIV = document.createElement("div");
        vezbanjeDIV.className = "domaci";

        let naslov = document.createElement("h3");
        naslov.textContent = "Zadaci za vežbanje";
        vezbanjeDIV.appendChild(naslov)

        let vezbanjeOL = document.createElement("ol");
        for(let zad of data.zadaciZaVezbanje){
            let li = document.createElement("li");
            li.textContent = zad;
            vezbanjeOL.appendChild(li);
        }
        vezbanjeDIV.appendChild(vezbanjeOL);
        root.append(vezbanjeDIV);
    })
    .catch(error => console.log(error))
}