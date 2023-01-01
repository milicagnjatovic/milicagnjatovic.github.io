function loadClassFromJSON(elId, classFile, prikazi = 'block'){
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


            showBtn.style.display = prikazi;

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

        if ("zadaciZaVezbanje" in data) {
            let naslov = document.createElement("h3");
            naslov.textContent = "Zadaci za vežbanje";
            vezbanjeDIV.appendChild(naslov)

            let vezbanjeOL = document.createElement("ol");
            for(let zad of data.zadaciZaVezbanje){
                let li = document.createElement("li");
                li.innerHTML = zad;
                vezbanjeOL.appendChild(li);
            }
            vezbanjeDIV.appendChild(vezbanjeOL);
            root.append(vezbanjeDIV);
        }
    })
    .catch(error => console.log(error))
}

function dohvatiRokove(){
    let root = document.getElementById("rokoviLinkovi")
    fetch("../../resources/rbp/rokovi/files.json") // vr=1.0 da bi se video najnoviji fajl
    .then(response => response.json())
    .then(data => {
        let tabela = document.createElement('table');
        tabela.className = "tabela_rokova";
        root.append(tabela)
        for(let godina of data.godine){
            let n = data.files[godina].length;
            let tr = document.createElement('tr');
            tabela.append(tr)
            for(let i=0; i<n; i++){
                let rok = data.files[godina][i];

                let cell = document.createElement('td');
                tr.append(cell);
                
                let cb = document.createElement('input');
                cb.type = 'checkbox'
                if (!localStorage.hasOwnProperty(rok)){
                    localStorage[rok] = "0";
                }
                cb.checked = localStorage[rok]=="1";
                cb.onclick = () => {
                    console.log(rok)
                    localStorage[rok] = localStorage[rok]=="0" ? "1" : "0";
                }
                cell.append(cb);
                
                let item = document.createElement('a');
                item.href = "./resources/rbp/rokovi/" + rok;
                item.target='_blank';
                item.text = rok 
                item.style.display = 'block'
                cell.append(item);

                if(i+1<n && data.files[godina][i+1].startsWith('res')){
                    console.log("resenje");
                    let item = document.createElement('a');
                    item.href = "./resources/rbp/rokovi/" + data.files[godina][i+1];
                    item.target='_blank';
                    item.text = "rešenje" 
                    item.style.display = 'block'
                    cell.append(item);
                    cell.style.border = "solid darkblue 5px"
                    i++;
                }
            }
        }
        let item = document.createElement('a');
        item.href = "http://poincare.matf.bg.ac.rs/~nenad/rbp/ispit/rbp.rokovi.html";
        item.target='_blank';
        item.text = "ostali rokovi" 
        item.style.display = 'block'
        root.append(item);
    })
    .catch(error => console.log(error))
}