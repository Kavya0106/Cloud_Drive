<?php 
session_start();

	include("connection.php");
	include("functions.php");

	$user_data = check_login($con);

?>

<html>
    <head>
        <title>My Drive </title>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"rel="stylesheet">
        <link rel="stylesheet" href="style.css"/>

    </head>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cloud Drive </title>
        
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    </head>
    <body>
        <h5 style="margin-left:80rem"> Hello, <?php echo $user_data['user_name']; ?>  <a href="logout.php">Logout</a> </h5>
        <div class="bg-image" 
         style="background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIGDUDSNFBagD0ws8IMn1I241uE2S95am6qg&usqp=CAU');
                height: auto;width:auto">
        <div>
            <span> <h1 style="color:blue;border: 2px solid rgb(255, 255, 255);text-align: center; font-size: 50px">Cloud drive</h1>
            </span>
        </div>
        <div id="header">
            <button id ="addFolder">Add Folder</button>
            <button id ="addTextFile">Add Text file</button>
            <button id ="addAlbum">Add Album</button>
         </div>
         <div id="breadcrumb">
            <a purpose ="path" rid="-1">Root</a>
        </div>
 
        <div id ="container">
         
        </div>
    
    
        <!-- <div class="container"> -->
            <div class="row"style="padding-top:20px;height:100vh">
                <div class="col-2"style="text-align: center;color:black;border: 3px solid">
                    <div class="container">
                        <br><button type="button" id="Home" class="btn btn-outline-primary">Home</button><br>
                        <br>
                        <div  class="dropdown">
                            <button class="dropbtn">Operations</button>
                            
                            <div class="dropdown-content">
                                <button class ="addFolder">Add Folder</button>
                                <button class ="addTextFile">Add Test file</button>
                                <button class ="addAlbum">Add Album</button>
                            </div>
                          </div>
                          <br>
                          <br><button type="button" id="Info" class="btn btn-outline-info" onclick="document.location='account.html'">Account Info</button><br>
                          
                        <br><button id="Mydrive"type="button"class="btn btn-outline-success">Mydrive</button><br>
                        
                        <!-- <br><button id="Theme"type="button"class="btn btn-outline-dark">Theme</button><br> -->
                        <br>
                                                  
                         </div>
                          
                    </div>
                    <div id="app">
                        <div id="app-title-bar"> 
                            <div id ="app-title">Title will come here</div>
                            <div id="win-action">
                                <!-- <span id = "app-mini"class="material-icons">minimize</span>
                                <span id = "app-fullScreen" class="material-icons">fullscreen</span> -->
                                <span id = "app-close" class="material-icons">close</span>
                                
                            </div>
                     </div>
                        <div id="app-menu-bar">   </div>
                        <div id="app-body">   </div>
                    </div>
                    
                    <template id="templates">
                        <div class ="folder" rid="" pid="">
                            <span action="rename" class="material-icons">mode_edit</span>
                            <span action="delete"class="material-icons">delete</span>
                            <span action="view"class="material-icons">view_module</span>
                            <div purpose="name"></div>
             
                        </div>
                        <div class ="text-file" rid="" pid="">
                         <span action="rename" class="material-icons">mode_edit</span>
                            <span action="delete"class="material-icons">delete</span>
                            <span action="view"class="material-icons">view_module</span>
                         <div purpose="name"></div>
                     </div>
                     <div class ="album" rid="" pid="">
                         <span action="rename" class="material-icons">mode_edit</span>
                            <span action="delete"class="material-icons">delete</span>
                            <span action="view"class="material-icons">view_module</span>
                         <div purpose="name"></div>
                     </div>
                        <a purpose ="path" rid="-1">Root</a>
                      <div purpose ="notepad-menu" class="notepad-menu">
                         <span action="save" class="material-icons">save</span>
                         <span pressed="false" action ="bold" class="material-icons">format_bold</span>
                         <span pressed="false" action ="italic" class="material-icons">format_italic</span>
                         <span pressed="false" action ="underline" class="material-icons">format_underline</span>
                         <input type="color" action ="bg-color" />
                         <input type="color" action ="fg-color" />
                         <select action ="font-family">
                             <option value="monospace">monospace</option>
                             <option value="serif">serif</option>
                             <option value="Arial">Arial</option>
                             <option value="sans-serif">sans-serif</option>
                              <option value="cursive">cursive</option>
                         </select>
                        <select action ="font-size">
                         <option value="8">8</option>
                         <option value="10">10</option>
                         <option value="12">12</option>
                         <option value="14">14</option>
                         <option value="18">18</option>
                         <option value="22">22</option>
                         <option value="30">30</option>          
                         <option value="34">34</option>
                        </select>
                        <span action ="download" class="material-icons">download</span>
                        <span action ="ForUpload" class="material-icons">upload</span>
                        
                        <input action ="upload" type="file"/>
                        <a purpose="download" href="http://www.google.com">link</a>
                      </div>
                      <div purpose ="notepad-body" class="notepad-body">
                       <textarea >i am the notepad body </textarea>
                      </div>
                      <div purpose ="album-menu" class="album-menu">
                         <span action="save" class="material-icons">save</span>
                         <span action="download" class="material-icons">download</span>
                         <!-- <span action="upload" class="material-icons">upload</span> -->
                         <span action="add" class="material-icons">add</span>
                         <span action="delete" class="material-icons">delete</span>
                         <span action="left" class="material-icons"id ="movie-left">arrow_back</span>
                         <span action="right" class="material-icons"id ="movie-right">arrow_forward</span>
                         <!-- <span action="play" class="material-icons">play_arrow</span>
                         <span action="pause" class="material-icons">pause</span> -->
                      </div>
                      <div purpose ="album-body" class="album-body">
                        <div class="picture-list">
                  
                        </div>
                        <div class = "picture-view">
                 
                             <span action="left" class="material-icons"id ="left">arrow_back</span>
                          
                            <div class="picture-main">
                            
                            </div>
                            
                                <span action="right" class="material-icons"id="right">arrow_forward</span>
                            
                        </div>   
                        </div>
                
              </div>
        </div>
    
      
       

        
        </div>
        
        
       </template>
       
       
       <script type ="text/javascript" src="main.js"></script>
    </body>
</html>