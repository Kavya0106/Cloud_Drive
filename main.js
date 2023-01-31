(function(){
    let btnAddFolder = document.querySelector("#addFolder");
    let btnAddTextFile = document.querySelector("#addTextFile");
    let btnAddAlbum =document.querySelector("#addAlbum");
    let divbreadcrumb = document.querySelector("#breadcrumb");
    let aRootPath=divbreadcrumb.querySelector("a[purpose='path']");
    let myDriveMain = document.querySelector("#Mydrive")
    let Mainpath = myDriveMain.querySelector("a[purpose='path']");
    let divContainer =document.querySelector("#container");
    let templates =document.querySelector("#templates");
    let dropbtnAddFolder = document.querySelector(".dropdown-content .addFolder");
    let dropbtnAddFile = document.querySelector(".dropdown-content .addTextFile");
    let dropbtnAddAlbum = document.querySelector(".dropdown-content .addAlbum");

    let divApp= document.querySelector("#app")
    let divAppTitleBar = document.querySelector("#app-title-bar")
    let divAppTitle = document.querySelector("#app-title")
    let divAppMenuBar = document.querySelector("#app-menu-bar")
    let divAppBody= document.querySelector("#app-body")
    let appClose = document.querySelector("#app-close");

    dropbtnAddFolder.addEventListener("click",addFolder)
    dropbtnAddFile.addEventListener("click",AddTextFile)
    dropbtnAddAlbum.addEventListener("click",addAlbum)
   
    // let left = .querySelector("#movie-left");
    
    // let picture_view = divAppBody.querySelector(".picture-view");
    // let left = picture_view.querySelector("#movie-left");
    // left.addEventListener("click",leftFun);

    let resources=[]
    let cfid=-1//initially we are at root
    let rid=0
    btnAddFolder.addEventListener("click",addFolder)
    btnAddTextFile.addEventListener("click",AddTextFile)
    btnAddAlbum.addEventListener("click",addAlbum);
    aRootPath.addEventListener("click",ViewfromPath);
    myDriveMain.addEventListener("click",ViewfromPath1)
    appClose.addEventListener("click",closeApp);
    
    let divAlbumBodytemplate = templates.content.querySelector("[purpose='album-body']")
    let divAlbumBody= document.importNode(divAlbumBodytemplate,true)
    let divPictureList = divAlbumBody.querySelector(".picture-list");
    let parentImg = divAlbumBody.querySelector(".picture-main");
    let ViewMainImg = divAlbumBody.querySelector(".picture-view");
    let leftMain = ViewMainImg.querySelector("#left");
    let rightMain = ViewMainImg.querySelector("#right");
 
    
    
    function closeApp(){
        divAppTitle.innerHTML ="Title will come here";
        divAppTitle.setAttribute("rid","");
        divAppMenuBar.innerHTML="";
        divAppBody.innerHTML ="";

    }
    function addFolder(){
        let rname= prompt("Enter folder's name");
        if(rname!=null){rname=rname.trim();
        }
        if(!rname){return}// empty name 
        
        let alreadyExists = resources.some(r=> r.rname==rname && r.pid==cfid);
        if(alreadyExists== true){// already use name
            alert(rname+" is already in use  Try some other name");
            return
        }
        rid++;
        let pid =cfid
        addFolderHtml(rname,rid,pid)
        resources.push({
            rid: rid,
            rname : rname,
            rtype:"folder",
            pid: cfid
        })
        saveToStorage();
         
}

function AddTextFile(){
    let rname= prompt("Enter file's name");
    if(rname!=null){rname=rname.trim();
    }
    if(!rname){return}// empty name 
    
    let alreadyExists = resources.some(r=> r.rname==rname && r.pid==cfid);
    if(alreadyExists== true){// already use name
        alert(rname+" is already in use  Try some other name");
        return
    }
    rid++;
    let pid =cfid
    addTextFileHtml(rname,rid,pid)
    resources.push({
        rid: rid,
        rname : rname,
        rtype:"text-file",
        pid: cfid,
        isBold :true,
        isItalic:false,
        isUnderline:false,
        bgColor:"#000000",
        textColor:"#FFFFFF",
        fontFamily: "cursive",
        fontSize:22,
        content:"I am the new file"
    });
    saveToStorage();
    }

 function addAlbum(){
        let rname= prompt("Enter album's name");
        if(rname!=null){rname=rname.trim();
        }
        if(!rname){return}// empty name 
        
        let alreadyExists = resources.some(r=> r.rname==rname && r.pid==cfid);
        if(alreadyExists== true){// already use name
            alert(rname+" is already in use  Try some other name");
            return
        }
        let pid =cfid
        rid++;
        addAlbumHtml(rname,rid,pid)
        resources.push({
            rid: rid,
            rname : rname,
            rtype:"album",
            pid: cfid,
         
        });
        saveToStorage();
        }
    
    function addTextFileHtml(rname,rid,pid){
        let divFileTemplate = templates.content.querySelector(".text-file");
        let divFile = document.importNode(divFileTemplate,true);
        let spanRename = divFile.querySelector("[action =rename]");
        let spanDelete = divFile.querySelector("[action =delete]");
        let spanView = divFile.querySelector("[action =view]");
  
        let divName = divFile.querySelector("[purpose='name']");
          spanRename.addEventListener("click",renameTextFile)
          spanView.addEventListener("click",viewTextFile)
          spanDelete.addEventListener("click",deleteTextFile)
        divName.innerHTML = rname;
       divFile.setAttribute("rid",rid);
       divFile.setAttribute("pid",pid)
        divContainer.appendChild(divFile);

    }
    function addFolderHtml(rname,rid,pid){
        let divFolderTemplate = templates.content.querySelector(".folder");
        let divFolder = document.importNode(divFolderTemplate,true);
        let spanRename = divFolder.querySelector("[action =rename]");
        let spanDelete = divFolder.querySelector("[action =delete]");
        let spanView = divFolder.querySelector("[action =view]");
  
        let divName = divFolder.querySelector("[purpose='name']");
          spanRename.addEventListener("click",renameFolder)
          spanView.addEventListener("click",viewFolder)
          spanDelete.addEventListener("click",deleteFolder)
        divName.innerHTML = rname;
       divFolder.setAttribute("rid",rid);
       divFolder.setAttribute("pid",pid)
        divContainer.appendChild(divFolder);

    }

    function addAlbumHtml(rname,rid,pid){
        let divAlbumTemplate = templates.content.querySelector(".album");
        let divAlbum = document.importNode(divAlbumTemplate,true);

        let spanRename = divAlbum.querySelector("[action =rename]");
        let spanDelete = divAlbum.querySelector("[action =delete]");
        let spanView = divAlbum.querySelector("[action =view]");
  
        let divName = divAlbum.querySelector("[purpose='name']");
          spanRename.addEventListener("click",renameAlbum)
          spanView.addEventListener("click",viewAlbum)
          spanDelete.addEventListener("click",deleteAlbum)
        divName.innerHTML = rname;
        divAlbum.setAttribute("rid",rid);
        divAlbum.setAttribute("pid",pid)
        divContainer.appendChild(divAlbum);
        saveToStorage();
    }

    function deleteFolder(){
        let divFolder = this.parentNode;
        let divName = divFolder.querySelector("[purpose='name']");
        let fidtbd = parseInt( divFolder.getAttribute("rid"));
        let fname=divName.innerHTML;

       let flag = confirm("Are you sure you want to delete the folder as it contains children "+fname)
       if(!flag){return;}
        divContainer.removeChild(divFolder);//html
        deleteHelper(fidtbd);//ram
            saveToStorage();//storage
    }
function deleteHelper(fidtbd){
    let children = resources.filter(r=> r.pid==fidtbd)
    for(let i=0;i<children.length;i++){
        deleteHelper(children[i].rid);//this is capable of delete
    }
    let ridx = resources.findIndex(r=>r.rid==fidtbd);
    console.log(resources[ridx].rname);
    resources.splice(ridx,1);

}
    function deleteTextFile(){
        let divFile = this.parentNode;
        let divName = divFile.querySelector("[purpose='name']");
        let fidtbd = parseInt( divFile.getAttribute("rid"));
        let fname=divName.innerHTML;

       let flag = confirm("Are you sure you want to delete the file -> "+fname)
       if(!flag){return;}
        divContainer.removeChild(divFile);//html
        let ridx = resources.findIndex(r=>r.rid==fidtbd);
        resources.splice(ridx,1);
            saveToStorage();//storage
    }

    function deleteAlbum(){
        let divAlbum = this.parentNode;
        let divName = divAlbum.querySelector("[purpose='name']");
        let fidtbd = parseInt( divAlbum.getAttribute("rid"));
        let fname=divName.innerHTML;

       let flag = confirm("Are you sure you want to delete the file -> "+fname)
       if(!flag){return;}
        divContainer.removeChild(divAlbum);//html
        let ridx = resources.findIndex(r=>r.rid==fidtbd);
        resources.splice(ridx,1);
            saveToStorage();//storage
    }
    function renameFolder(){
        let nrname= prompt("Enter folder's name");
        if(nrname!=null){nrname=nrname.trim();
        }

        if(!nrname){return}// empty name 

        let Rename = this;
        let divFolder = Rename.parentNode;
        let divName=divFolder.querySelector("[purpose='name']");
        let orname = divName.innerHTML;
        let ridTBU = parseInt(divFolder.getAttribute("rid"));
        if(nrname==orname){
            alert("Please enter a new name")
            return;
        }
        let alreadyExists = resources.some(r=> r.rname==nrname && r.pid==cfid);
        if(alreadyExists== true){// already use name
            alert(nrname+" is already in use  Try some other name");
            return
        }

            divName.innerHTML= nrname;

            let resource = resources.find(r=>r.rid==ridTBU);
            resource.rname=nrname
            saveToStorage();

    }
    function renameTextFile(){
        let nrname= prompt("Enter new file's name");
        if(nrname!=null){nrname=nrname.trim();
        }

        if(!nrname){return}// empty name 

        let Rename = this;
        let divFile = Rename.parentNode;
        let fileName=divFile.querySelector("[purpose='name']");
        let orname = fileName.innerHTML;
        let ridTBU = parseInt(divFile.getAttribute("rid"));
        if(nrname==orname){
            alert("Please enter a new name")
            return;
        }
        let alreadyExists = resources.some(r=> r.rname==nrname && r.pid==cfid);
        if(alreadyExists== true){// already use name
            alert(nrname+" is already in use  Try some other name");
            return
        }

            fileName.innerHTML= nrname;

            let resource = resources.find(r=>r.rid==ridTBU);
            resource.rname=nrname
            saveToStorage();

    }

    function renameAlbum(){
        let nrname= prompt("Enter new file's name");
        if(nrname!=null){nrname=nrname.trim();
        }

        if(!nrname){return}// empty name 

        let Rename = this;
        let divAlbum = Rename.parentNode;
        let fileName=divAlbum.querySelector("[purpose='name']");
        let orname = fileName.innerHTML;
        let ridTBU = parseInt(divAlbum.getAttribute("rid"));
        if(nrname==orname){
            alert("Please enter a new name")
            return;
        }
        let alreadyExists = resources.some(r=> r.rname==nrname && r.pid==cfid);
        if(alreadyExists== true){// already use name
            alert(nrname+" is already in use  Try some other name");
            return
        }

            fileName.innerHTML= nrname;

            let resource = resources.find(r=>r.rid==ridTBU);
            resource.rname=nrname
            saveToStorage();

    }
    function viewFolder(){
      let SpanView = this;
      let divFolder = SpanView.parentNode;
      let divName = divFolder.querySelector("[purpose='name']")
      let fname = divName.innerHTML;
      let fid = parseInt(divFolder.getAttribute("rid"));
      let aPathTemplates = templates.content.querySelector("a[purpose='path']")
      let aPath =document.importNode(aPathTemplates, true);
      aPath.innerHTML = fname;
      aPath.setAttribute("rid",fid);
      aPath.addEventListener("click",ViewfromPath);
      divbreadcrumb.appendChild(aPath);

      cfid =fid;
      divContainer.innerHTML ="";
      for(let i = 0; i < resources.length; i++){
        if(resources[i].pid == cfid){
            if(resources[i].rtype == "folder"){
                addFolderHtml(resources[i].rname, resources[i].rid, resources[i].pid);
            } else if(resources[i].rtype == "text-file"){
                addTextFileHtml(resources[i].rname, resources[i].rid, resources[i].pid);
            }
            else if(resources[i].rtype == "album"){
                addAlbumHtml(resources[i].rname, resources[i].rid, resources[i].pid);
            }
        }
     }
    }
     function ViewfromPath(){
         let aPath=this;
        //  console.log(aPath);
         let fid = parseInt(aPath.getAttribute("rid"));
        //  console.log(fid);
         while(aPath.nextSibling){
             aPath.parentNode.removeChild(aPath.nextSibling);
         }
         cfid=fid;
         divContainer.innerHTML="";
         closeApp();
         for(let i = 0; i < resources.length; i++){
            if(resources[i].pid == cfid){
                if(resources[i].rtype == "folder"){
                    addFolderHtml(resources[i].rname, resources[i].rid, resources[i].pid);
                } else if(resources[i].rtype == "text-file"){
                    addTextFileHtml(resources[i].rname, resources[i].rid, resources[i].pid);
                }
                else if(resources[i].rtype == "album"){
                    addAlbumHtml(resources[i].rname, resources[i].rid, resources[i].pid);
                }
            }
         }

     }

     function ViewfromPath1(){
        // let aPath="<a purpose ='path'rid='-1'</a>";
        // let fid = parseInt(aPath.getAttribute("rid"));
        let fid =-1;
        closeApp();
        // while(aPath.nextSibling){
        //     aPath.parentNode.removeChild(aPath.nextSibling);
        // }
        console.log(fid);
        cfid=fid;
        divContainer.innerHTML="";
        for(let i = 0; i < resources.length; i++){
           if(resources[i].pid == cfid){
               if(resources[i].rtype == "folder"){
                   addFolderHtml(resources[i].rname, resources[i].rid, resources[i].pid);
               } else if(resources[i].rtype == "text-file"){
                   addTextFileHtml(resources[i].rname, resources[i].rid, resources[i].pid);
               }
               else if(resources[i].rtype == "album"){
                   addAlbumHtml(resources[i].rname, resources[i].rid, resources[i].pid);
               }
           }
        }

    }
    function viewTextFile(){
            let divTextFile= this.parentNode;
            let divName= divTextFile.querySelector("[purpose='name']")
            let fname =divName.innerHTML;
            let fid = parseInt(divTextFile.getAttribute("rid"))

            let divNotepadMenutemplate = templates.content.querySelector("[purpose='notepad-menu']")
            let divNotepadMenu= document.importNode(divNotepadMenutemplate,true)
             divAppMenuBar.innerHTML="";
             divAppMenuBar.appendChild(divNotepadMenu)

            let divNotepadBodytemplate = templates.content.querySelector("[purpose='notepad-body']")
            let divNotepadBody= document.importNode(divNotepadBodytemplate,true)
            divAppBody.innerHTML="";
             divAppBody.appendChild(divNotepadBody)


             divAppTitle.innerHTML=fname;
             divAppTitle.setAttribute("rid",fid);

             let spanSave = divAppMenuBar.querySelector("[action = save]")
             let spanBold = divAppMenuBar.querySelector("[action = bold]")
             let spanItalic = divAppMenuBar.querySelector("[action = italic]")
             let spanUnderline = divAppMenuBar.querySelector("[action = underline]")
             let inputBGcolor = divAppMenuBar.querySelector("[action = bg-color]")
             let inputTextColor = divAppMenuBar.querySelector("[action = fg-color]")
             let selectFontFamily = divAppMenuBar.querySelector("[action = font-family]")
             let selectFontSize = divAppMenuBar.querySelector("[action = font-size]")
             let spanDownload = divAppMenuBar.querySelector("[action = download]")
              let spanUpload = divAppMenuBar.querySelector("[action = ForUpload]")
             let inputUpload = divAppMenuBar.querySelector("[action = upload]")
             let textArea = divAppBody.querySelector("textArea");

                spanSave.addEventListener("click",saveNotepad)
                spanBold.addEventListener("click",NotepadBold)
                spanItalic.addEventListener("click",NotepadItalic)
                spanUnderline.addEventListener("click",NotepadUnderline)
                inputBGcolor.addEventListener("change",ChangeBGcolor)
                inputTextColor.addEventListener("change",Changetextcolor)
                selectFontFamily.addEventListener("change",ChangefontFamily)
                selectFontSize.addEventListener("change",ChangefontSize)
                spanDownload.addEventListener("click",downloadNotepad);
                inputUpload.addEventListener("change",uploadNotepad);
                spanUpload.addEventListener("click",function(){
                    inputUpload.click();
                })
                
                let resource = resources.find(r=> r.rid == fid);
                spanBold.setAttribute("pressed", !resource.isBold);
                spanItalic.setAttribute("pressed",!resource.isItalic);
                spanUnderline.setAttribute("pressed",!resource.isUnderline);
                inputBGcolor.value =resource.bgColor;
                inputTextColor.value =resource.textColor;
                selectFontFamily.value =resource.fontFamily;
                selectFontSize.value =resource.fontSize;
                textArea.value=resource.content;

                spanBold.dispatchEvent(new Event("click"));
                spanItalic.dispatchEvent(new Event("click"));
                spanUnderline.dispatchEvent(new Event("click"));
                inputBGcolor.dispatchEvent(new Event("change"));
                inputTextColor.dispatchEvent(new Event("change"));
                selectFontFamily.dispatchEvent(new Event("change"));
                selectFontSize.dispatchEvent(new Event("change"));
                    
            }
        
    function viewAlbum(){
        let divAlbum= this.parentNode;
        let divName= divAlbum.querySelector("[purpose='name']")
        let fname =divName.innerHTML;
        let fid = parseInt(divAlbum.getAttribute("rid"))

        let divAlbumMenutemplate = templates.content.querySelector("[purpose='album-menu']")
        let divAlbumMenu= document.importNode(divAlbumMenutemplate,true)
         divAppMenuBar.innerHTML="";
         divAppMenuBar.appendChild(divAlbumMenu)

        // let divAlbumBodytemplate = templates.content.querySelector("[purpose='album-body']")
        // let divAlbumBody= document.importNode(divAlbumBodytemplate,true)
        divAppBody.innerHTML="";
         divAppBody.appendChild(divAlbumBody)


         divAppTitle.innerHTML=fname;
         divAppTitle.setAttribute("rid",fid);
         let spanAdd = divAlbumMenu.querySelector("[action=add]");
         spanAdd.addEventListener("click",addPicture)
         let spanDelete = divAlbumMenu.querySelector("[action=delete]");
         spanDelete.addEventListener("click",DeletePicture)
        let left = divAlbumMenu.querySelector("#movie-left");
         left.addEventListener("click",LeftFunc);
         let right = divAlbumMenu.querySelector("#movie-right");
         right.addEventListener("click",RightFunc);
        
    }
    leftMain.addEventListener("click",LeftFunc);
    rightMain.addEventListener("click",RightFunc);
    let uniqueIdentifier = 0;
    let imgArr = [];
    function addPicture(){
        let iurl = prompt("Enter an image url");
       
        if (iurl == null || iurl == "") {
            alert("Please enter img src");
            return;
        }
        addImageToListandShow(iurl);
        // img.setAttribute("src",iurl);
        // img.addEventListener("click",showPcitureInMain);

        
    }
    function addImageToListandShow(imgLink) {
        let previewImg  = document.createElement("img");
        previewImg .setAttribute("src",imgLink);
        previewImg.setAttribute("cid", uniqueIdentifier);
        previewImg.setAttribute("class", "img_preview");
        //  divPictureList = divAppBody.querySelector(".picture-list");
        divPictureList.appendChild(previewImg);
        console.log(divPictureList);
        setShowImage(imgLink, uniqueIdentifier)
        // to enable image chanage on click;
        handleImagFunctionality(uniqueIdentifier, imgLink, previewImg);
        uniqueIdentifier++;

    }
    function handleImagFunctionality(uniqueIdentifier, imgLink, previewImg) {
        let imgidentifierObj ={
            cid: uniqueIdentifier,
            url: imgLink
        }
        imgArr.push(imgidentifierObj);
        previewImg.addEventListener("click", function () {
            
            let currImgSrc = previewImg.getAttribute("src");
            setShowImage(currImgSrc);

            setShowImage(imgidentifierObj.url)

        })
    }
    // let parentImg = divAppBody.querySelector(".picture-main")
    function setShowImage(imgLink, uniqueIdentifier) {
        
        let innerHtmlBlock = `<img class='picture-main' src=${imgLink} alt=""
        cid=${uniqueIdentifier}></img>`
        // img show -> replace 
        parentImg.innerHTML = innerHtmlBlock;
        
    }
    function LeftFunc(e){
        if(parentImg.children.length!=0){
            let cShowImg = parentImg.children[0];
            let cid = cShowImg.getAttribute("cid");
            for(let i =0;i<imgArr.length;i++){
                let imageObj = imgArr[i];
                if(cid ==imageObj.cid){
                    let nextIdx = Math.abs((i - 1) % imgArr.length);
                    let newImgObj = imgArr[nextIdx];
                    setShowImage(newImgObj.url,newImgObj.cid);
                    return;
                }
            }
        }
        else{
            alert("no Image found");
        }
        
    }
    function RightFunc(e){
        // let parentImg = divAppBody.querySelector(".picture-main")
        // alert(parentImg.length); 
    console.log(parentImg.children.length)
        if (parentImg.children.length != 0) {
            let cShowImg = parentImg.children[0];
            // show image -> image padi hui hai -> cid 
            let cid = cShowImg.getAttribute("cid");
            // cid search -> img array
            for (let i = 0; i < imgArr.length; i++) {
                let imgDescObj = imgArr[i];
                if (cid == imgDescObj.cid) {
                    // matching img -> idx get
                    // idx+1-> url ,cid -> show image wo set kar dunga 
                    let nextIdx = (i + 1) % imgArr.length;
                    let newImgObj = imgArr[nextIdx];
                    setShowImage(newImgObj.url, newImgObj.cid);
                    return;
                }
            }
        } else {
            alert("No image found");
        }
    }
    function DeletePicture(){
    if (parentImg.children.length != 0) {
        let cShowImg = parentImg.children[0];
        // show image -> image padi hui hai -> cid 
        let cid = cShowImg.getAttribute("cid");
        // cid search -> img array
        // matching img -> idx get
        removeImage(cid);
    }
    else {
        alert("No image");
    }
    }
    function removeImage(cid) {
    // 
    parentImg.children[0].remove();
    // preview remove  
     
    let previewChildrens = divPictureList.children;
    console.log(divPictureList.children)
    for (let i = 0; i < previewChildrens.length; i++) {
        let cCid = previewChildrens[i].getAttribute("cid");
        if (cCid == cid) {
            previewChildrens[i].remove();
            break;
        }
    }
    // divPictureList.innerHTML=previewChildrens;
    for (let i = 0; i < imgArr.length; i++) {
        let imgDescObj = imgArr[i]
        if (imgDescObj.cid == cid) {
            imgArr.splice(i, 1);
            break;
        }
    }

}


        function downloadNotepad(){
            let fid= parseInt(divAppTitle.getAttribute("rid"));
         let resource = resources.find(r=>r.rid==fid)
         let divNotepadMenu = this.parentNode;
         
         let strForDownload = JSON.stringify(resource);
         let encodedData = encodeURIComponent(strForDownload);
         
         let aDownload = divNotepadMenu.querySelector("a[purpose=download]");
        aDownload.setAttribute("href","data:text/json; charset=utf-8, " + encodedData)
        aDownload.setAttribute("download", resource.rname + ".json");

        aDownload.click();
        
    }

    function uploadNotepad(){
        let file =window.event.target.files[0];
            let reader = new FileReader();
            reader.addEventListener("load",function(){
                let data = window.event.target.result;
                let resource = JSON.parse(data);

            
             let spanBold = divAppMenuBar.querySelector("[action = bold]")
             let spanItalic = divAppMenuBar.querySelector("[action = italic]")
             let spanUnderline = divAppMenuBar.querySelector("[action = underline]")
             let inputBGcolor = divAppMenuBar.querySelector("[action = bg-color]")
             let inputTextColor = divAppMenuBar.querySelector("[action = fg-color]")
             let selectFontFamily = divAppMenuBar.querySelector("[action = font-family]")
             let selectFontSize = divAppMenuBar.querySelector("[action = font-size]")
             let textArea = divAppBody.querySelector("textArea");

                spanBold.setAttribute("pressed", !resource.isBold);
                spanItalic.setAttribute("pressed",!resource.isItalic);
                spanUnderline.setAttribute("pressed",!resource.isUnderline);
                inputBGcolor.value =resource.bgColor;
                inputTextColor.value =resource.textColor;
                selectFontFamily.value =resource.fontFamily;
                selectFontSize.value =resource.fontSize;
                textArea.value=resource.content;

                spanBold.dispatchEvent(new Event("click"));
                spanItalic.dispatchEvent(new Event("click"));
                spanUnderline.dispatchEvent(new Event("click"));
                inputBGcolor.dispatchEvent(new Event("change"));
                inputTextColor.dispatchEvent(new Event("change"));
                selectFontFamily.dispatchEvent(new Event("change"));
                selectFontSize.dispatchEvent(new Event("change"));

            })
            reader.readAsText(file);
        }

        function saveNotepad(){
            let fid= parseInt(divAppTitle.getAttribute("rid"));
            alert("File saved");
            let spanSave = divAppMenuBar.querySelector("[action = save]")
            let spanBold = divAppMenuBar.querySelector("[action = bold]")
            let spanItalic = divAppMenuBar.querySelector("[action = italic]")
            let spanUnderline = divAppMenuBar.querySelector("[action = underline]")
            let inputBGcolor = divAppMenuBar.querySelector("[action = bg-color]")
            let inputTextColor = divAppMenuBar.querySelector("[action = fg-color]")
            let selectFontFamily = divAppMenuBar.querySelector("[action = font-family]")
            let selectFontSize = divAppMenuBar.querySelector("[action = font-size]")
            let textArea= divAppBody.querySelector("textArea")
            
            let resource=resources.find(r=>r.rid==fid)
            resource.isBold = spanBold.getAttribute("pressed") == "true";
            resource.isItalic = spanItalic.getAttribute("pressed")=="true";
            resource.isUnderline = spanUnderline.getAttribute("pressed") == "true";
            resource.bgColor = inputBGcolor.value;
            resource.textColor = inputTextColor.value;
            resource.fontFamily = selectFontFamily.value;
            resource.fontSize = selectFontSize.value;
            resource.content = textArea.value;

            saveToStorage();
        }
        function NotepadBold(){
            let textArea= divAppBody.querySelector("textArea");
            let isPressed =this.getAttribute("pressed")=="true"
            if(isPressed== false){
                this.setAttribute("pressed",true);
                textArea.style.fontWeight ="bold";
            }
            else{
                this.setAttribute("pressed",false)
                textArea.style.fontWeight ="normal"
            }

        }
        function NotepadItalic(){
            let textArea= divAppBody.querySelector("textArea");
            let isPressed =this.getAttribute("pressed")=="true"
            if(isPressed== false){
                this.setAttribute("pressed",true);
                textArea.style.fontStyle ="italic";
            }
            else{
                this.setAttribute("pressed",false)
                textArea.style.fontStyle ="normal";
            }
            
        }
        function NotepadUnderline(){
            let textArea= divAppBody.querySelector("textArea");
            let isPressed =this.getAttribute("pressed")=="true"
            if(isPressed== false){
                this.setAttribute("pressed",true);
            textArea.style.textDecoration ="underline";
            }
            else{
                this.setAttribute("pressed",false)
                textArea.style.textDecoration ="none"
            }
            
        }
        function ChangeBGcolor(){
            let color=this.value;
            let textArea= divAppBody.querySelector("textArea");
            textArea.style.backgroundColor =color;

        }
        function Changetextcolor(){
            let color=this.value;
            let textArea= divAppBody.querySelector("textArea");
            textArea.style.color =color;
        }
        function ChangefontFamily(){
             let fontFamily = this.value;
             let textArea= divAppBody.querySelector("textArea")
             textArea.style.fontFamily = fontFamily
        }
        function ChangefontSize(){
            let fontSize = this.value;
             let textArea= divAppBody.querySelector("textArea")
             textArea.style.fontSize = fontSize
        }
  
    function saveToStorage(){
        let rjson= JSON.stringify(resources)// used to convert js object to a json string  which cane be saved
        localStorage.setItem("data",rjson)
    }
    function loadFromStroage(){
         let rjson = localStorage.getItem("data")
        if(!rjson){ return }
         resources = JSON.parse(rjson);
         for(let i = 0; i < resources.length; i++){
            if(resources[i].pid == cfid){
                if(resources[i].rtype == "folder"){
                    addFolderHtml(resources[i].rname, resources[i].rid, resources[i].pid);
                } else if(resources[i].rtype == "text-file"){
                    addTextFileHtml(resources[i].rname, resources[i].rid, resources[i].pid);
                }
                else if(resources[i].rtype == "album"){
                    addAlbumHtml(resources[i].rname, resources[i].rid, resources[i].pid);
                }
            }
            if(resources[i].rid>rid) {
                 rid=resources[i].rid;
             }
         }
    }
    

    loadFromStroage();



})();