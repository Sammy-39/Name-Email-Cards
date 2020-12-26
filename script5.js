function createNewElement(elementName){
    return document.createElement(elementName)
}

function setAttributes(elementName,attributeNameValuePair){
    Object.keys(attributeNameValuePair).forEach((attributeName)=>{
        elementName.setAttribute(attributeName,attributeNameValuePair[attributeName])
    })
}

var container = createNewElement("div")
setAttributes(container,{
    class:"container mt-5"
});

(function getData(){
    var request = new XMLHttpRequest()
    var data = []
    request.open("GET","https://gist.githubusercontent.com/rvsp/add40254aa126f045837fa5b51f47f1f/raw/4d724bfabf4cce7379a386e23bef6576ab99a2f9/pagination.json",true)
    request.send()
    request.onload = () =>{
        if(request.status===200){
            data = JSON.parse(request.response).slice(40,50)
            
            var rowElements = []
            var colElements = {}
            var dataIndex = 0

            for(var i=0;i<5;i++){
                rowElements[i] = createNewElement("div")
                setAttributes(rowElements[i],{class:"row"})
    
                colElements["R"+(i+1)] = []

                colElements["R"+(i+1)].push(createNewElement("div"))
                setAttributes(colElements["R"+(i+1)][0],{
                    class:"col-sm-6 col-md-6 col-lg-6 col-xl-6"
                })
                colElements["R"+(i+1)][0].innerHTML = `<p class="wrapper"> ${data[dataIndex]['name']} 
                <br> ${data[dataIndex]['email']} </p>`

                colElements["R"+(i+1)].push(createNewElement("div"))
                setAttributes(colElements["R"+(i+1)][1],{
                    class:"col-sm-6 col-md-6 col-lg-6 col-xl-6"
                })
                colElements["R"+(i+1)][1].innerHTML = `<p class="wrapper"> ${data[dataIndex+1]['name']} 
                <br> ${data[dataIndex+1]['email']} </p>`
                
                rowElements[i].append(...colElements["R"+(i+1)])
                dataIndex+=2
            }

            container.append(...rowElements)

            var pagNav = createNewElement("nav")
            setAttributes(pagNav,{
                "aria-label":"Page Navigation",
            })

            var pagNavList = createNewElement("ul")
            setAttributes(pagNavList,{
                class:"pagination justify-content-center mt-5"
            })

            var pagNavItems = []

            for(var i=0;i<13;i++){
                pagNavItems.push(createNewElement("li"))
                pagNavItems[i].classList.add("page-item")
                if(i===0){
                    pagNavItems[i].innerHTML = `<a class="page-link" href="index.html" tabindex="-1"> << </a>`
                }
                else if(i===1){
                    pagNavItems[i].innerHTML = `<a class="page-link" href="page4.html" tabindex="-1"> < </a>`
                }
                else if(i===2){
                    pagNavItems[i].innerHTML = `<a class="page-link" href="index.html">${i-1}</a>`
                }
                else if(i===6){
                    pagNavItems[i].classList.add("active")
                    pagNavItems[i].innerHTML = `<a class="page-link" href="#"> ${i-1} <span class="sr-only">(current)</span></a>`
                }
                else if(i===12){
                    pagNavItems[i].innerHTML = `<a class="page-link" href="page6.html" tabindex="-1"> > </a>`
                }
                else{
                    pagNavItems[i].innerHTML = `<a class="page-link" href="page${i-1}.html">${i-1}</a>`
                }

                if((i>1 && i<5) || (i>7 && i<12)){
                    pagNavItems[i].classList.add("d-none")
                }
            }

            pagNavList.append(...pagNavItems)
            pagNav.append(pagNavList)
            container.append(pagNav)
        }
        else{
            console.log(`${request.status} ${request.statusText}`)
        }
    }
})();

document.body.append(container)