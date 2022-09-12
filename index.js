async function getComments() {
    const resPost = await fetch('data.json')
    const post = await resPost.json()
    const actualUsername = document.querySelector('#ActualUsername')
    const username = post.currentUser.username;

 

    arrayCommentsContainer = [...post.comments]
    createCommentsContainer(arrayCommentsContainer,username)
     container.appendChild(addCommentBox(username))
    const textareas = document.querySelectorAll('.comment__text .textarea'),
    editButtons = document.querySelectorAll('.comment__tittle__config .edit'),
    deleteButtons = document.querySelectorAll('.comment__tittle__config .delete'),
    updateButtons = document.querySelectorAll('.comment__button .btn-update'),
    replysSecond = document.querySelectorAll('.reply__second'),
    replysFirst = document.querySelectorAll('.reply__first'),
    cancelMsgBtn = document.querySelector('.cancel__message__btn'),
    plosLikes = document.querySelectorAll('.plos__like'),
    minusLikes = document.querySelectorAll('.minus__like'),
    btnAdd = document.querySelector('.comment__add .btn__send')

    plosLikes.forEach(plos => {
        plos.addEventListener('click', function() {
            addLike(plos)
        })
    })

    minusLikes.forEach(minus => {
        minus.addEventListener('click', function() {
            removeLike(minus)
        })
    })

        window.onresize = () => {

            textareas.forEach((textarea) => {
                    updateHeight(textarea)
            })
        }
    textareas.forEach((textarea) => {
        textarea.addEventListener('keyup', function () {
            updateHeight(textarea)
        })
    })

  
    
    updateButtons.forEach((updateb) => {
        updateb.addEventListener('click', function () {
            updateMessage(updateb)
        })
    })
    
    deleteButtons.forEach((deleteb) => {
        deleteb.addEventListener('click', function(){deleteMessage(deleteb) })
    })
    
    cancelMsgBtn.addEventListener('click', cancelButton)
    
    
    
    replysSecond.forEach((reply) => {
        reply.addEventListener('click', function () {
            createCommentProcessS(reply,username)
        })
    })
    
    replysFirst.forEach((reply) => {
        reply.addEventListener('click', function () {
            createCommentProcessF(reply,username)
        })
    })
  
      
    btnAdd.addEventListener('click', function() {
        addMessage(btnAdd,username)
    })

}
getComments()

const container = document.querySelector('.container'),
body = document.querySelector('body'),
deleteMessageBox = document.querySelector('.delete__message__container'),
deleteMsgBtn = document.querySelector('.delete__message__btn');

function addLike(plos) {
   let container = plos.parentElement
   let score = container.querySelector('span')
   let minus = container.querySelector('.minus__like')
    score.textContent = parseInt(score.textContent) + 1
    plos.style.pointerEvents = "none"
    minus.style.pointerEvents = "auto"
    
}

function removeLike(minus) {
    let container = minus.parentElement
    let score = container.querySelector('span')
    let plos = container.querySelector('.plos__like')

    if( plos.style.pointerEvents == "none") {
        score.textContent = parseInt(score.textContent) - 1
        minus.style.pointerEvents = "none"
        plos.style.pointerEvents = "auto"
    }
    
     
 }

 function addCommentBox(username) {
    let div = document.createElement('div')
    div.classList.add('comment__add')
    let inner = `<div class="comment__card">
    <div class="comment__add__box">
        <div class="comment__img">
            <img id="ActualUsername" src="images/avatars/image-${username}.webp" alt="" />
        </div>
        <div class="comment__text__add">
            <textarea class="textarea" placeholder="Add a coment..."></textarea>
        </div>
        <div class="comment__button">
            <button class="btn__send" type="button">SEND</button>
        </div>
    </div>
</div>`

    div.innerHTML += inner;
    return div;
 }
function createCommentsContainer(arrayComments,username) {
    arrayComments.forEach(comments => {
        if(comments.username == username) {
            
        }
        else {

            let div = document.createElement('div')
             div.classList.add('comment__container')
              let comment__card = `  <div   class="comment__card">
                 <div class="comment__likes__container">
                <div class="comment__likes">
                    <svg class="plos__like"  width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                            fill="#C5C6EF"
                        />
                    </svg>
                    <span class="likes">${comments.score}</span>
                    <svg class="minus__like" width="11" height="3" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                            fill="#C5C6EF"
                        />
                    </svg>
                </div>
            </div>
            <div class="comment__principal">
                <div class="comment__tittle__container">
                    <div class="comment__tittle__user">
                        <img src="images/avatars/image-${comments.user.username}.png" alt="" />
                        <span class="username">${comments.user.username}</span>
                        <span class="date">${comments.createdAt}</span>
                    </div>
                    <div class="comment__tittle__reply">
                        <img src="images/icon-reply.svg" alt="" />
                        <span class="reply reply__first">Reply</span>
                    </div>
                </div>
                <div class="comment__text">
                    <textarea readonly class="textarea">${comments.content}</textarea>
                </div>
            </div>
        </div>
        `
            let parent = comments.user.username;
            div.innerHTML += comment__card;
            container.appendChild(div)
            let divReplyContainer = document.createElement('div')
            divReplyContainer.classList.add('comment__reply__container')
            let textarea = div.querySelector('.textarea')
            div.appendChild(divReplyContainer)
            updateHeight(textarea)
            if(comments.replies.length > 0) {
                comments.replies.forEach(reply => {
                    if(reply.user.username == username) {
                    
                        divReplyContainer.innerHTML +=  ` <div class="comment__reply">
                            <div class="comment__card">
                                <div class="comment__likes__container">
                                    <div class="comment__likes">
                                        <svg class="plos__like" width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                                                fill="#C5C6EF"
                                            />
                                        </svg>
                                        <span class="likes">${reply.score}</span>
                                        <svg class="minus__like" width="11" height="3" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                                                fill="#C5C6EF"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div class="comment__principal">
                                    <div class="comment__tittle__container">
                                        <div class="comment__tittle__user">
                                            <img src="images/avatars/image-${reply.user.username}.png" alt="" />
                                            <span class="username">${reply.user.username}</span>
                                            <span class="you">you</span>
                                            <span class="date">${reply.createdAt}</span>
                                        </div>
                                        <div class="comment__tittle__config">
                                            <div class="delete">
                                                <img src="images/icon-delete.svg" alt="" />
                                                <span>Delete</span>
                                            </div>
                                            <div class="edit">
                                                <img src="images/icon-edit.svg" alt="" />
                                                <span>Edit</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="comment__text">
                                        <textarea readonly class="textarea">@${parent} ${reply.content}</textarea>
                                    </div>
                                    <div class="comment__button">
                                        <button class="btn-update" type="button">UPDATE</button>
                                    </div>
                                </div>
                            </div>
                        </div>`
                    } else {
                        divReplyContainer.innerHTML += `<div class="comment__reply">
                <div class="comment__card">
                    <div class="comment__likes__container">
                        <div class="comment__likes">
                            <svg class="plos__like" width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                                    fill="#C5C6EF"
                                />
                            </svg>
                            <span class="likes">${reply.score}</span>
                            <svg class="minus__like" width="11" height="3" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                                    fill="#C5C6EF"
                                />
                            </svg>
                        </div>
                    </div>
                    <div class="comment__principal">
                        <div class="comment__tittle__container">
                            <div class="comment__tittle__user">
                                <img src="images/avatars/image-${reply.user.username}.png" alt="" />
                                <span class="username">${reply.user.username}</span>
                                <span class="date">${reply.createdAt}</span>
                            </div>
                            <div class="comment__tittle__reply">
                                <img src="images/icon-reply.svg" alt="" />
                                <span class="reply reply__second">Reply</span>
                            </div>
                        </div>
                        <div class="comment__text">
                            <textarea readonly class="textarea">@${parent} ${reply.content}</textarea>
                        </div>
                    </div>
                </div>
            </div>`

                    }
                    
             let textarea2 = divReplyContainer.querySelectorAll('.textarea')
             textarea2.forEach(text => {
                updateHeight(text)
             })
              
             
                })  
                
            }
      
    

       
        }
    })
}



    function addMessage(e,user) {
        let comment__add = e.parentElement.parentElement.parentElement.parentElement;
        let textarea = comment__add.querySelector('.textarea')
        let container = e.parentElement.parentElement.parentElement.parentElement.parentElement;
        let comment__card = `
        <div class="comment__card">
        <div class="comment__likes__container">
            <div class="comment__likes">
                <svg class="plos__like" width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                        fill="#C5C6EF"
                    />
                </svg>
                <span class="likes">0</span>
                <svg class="minus__like" width="11" height="3" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                        fill="#C5C6EF"
                    />
                </svg>
            </div>
        </div>
        <div class="comment__principal">
            <div class="comment__tittle__container">
                <div class="comment__tittle__user">
                    <img src="images/avatars/image-${user}.png" alt="" />
                    <span class="username">${user}</span>
                    <span class="you">you</span>
                    <span class="date">today</span>
                </div>
                <div class="comment__tittle__config">
                    <div class="delete">
                        <img src="images/icon-delete.svg" alt="" />
                        <span>Delete</span>
                    </div>
                    <div class="edit">
                        <img src="images/icon-edit.svg" alt="" />
                        <span>Edit</span>
                    </div>
                </div>
            </div>
            <div class="comment__text">
                <textarea readonly class="textarea"></textarea>
            </div>
            <div class="comment__button">
                <button class="btn-update" type="button">UPDATE</button>
            </div>
        </div>
    </div>

        <div class="comment__reply__container"></div>`
        let div = document.createElement('div')
        div.classList.add('comment__container')
        div.innerHTML += comment__card;
        let divTextarea = div.querySelector('.textarea')
        divTextarea.value = textarea.value;
        if(textarea.value == ""){
            return
        }
        comment__add.insertAdjacentElement("beforebegin", div)

        textarea.value = "";
        body.style.minHeight += "100px"
        let botonEdit = div.querySelector('.comment__tittle__config .edit');
        let botonDelete = div.querySelector('.comment__tittle__config .delete');
        let botonUpdate = div.querySelector('.comment__button .btn-update');
        let minus = div.querySelector('.minus__like')
        let plos = div.querySelector('.plos__like')

        botonEdit.addEventListener('click', function () {
            editMessage(botonEdit)
        })
    
        botonDelete.addEventListener('click', function () {
            deleteMessage(botonDelete)
        })
    
       botonUpdate.addEventListener('click', function() {
            updateMessage(botonUpdate)
       })
       plos.addEventListener('click', function() {
        addLike(plos)
       })
    
        minus.addEventListener('click', function() {
        removeLike(minus)
    })
       

    }
    

function updateHeight(e) {
     e.style.height = 'auto'
    let scHeight = e.scrollHeight
    e.style.height = `${scHeight}px`
  
}

function editMessage(e) {
    let comment__principal = e.parentElement.parentElement.parentElement
    comment__principal.classList.add('--editable')
    let btnText = e.parentElement.parentElement.parentElement.querySelector('.textarea')
    let btnDelete = comment__principal.querySelector('.delete');

    btnText.removeAttribute('readonly')
    updateHeight(btnText);
    e.style.pointerEvents = 'none';
    e.style.opacity = '0.5';
    btnDelete.style.pointerEvents = 'none';
    btnDelete.style.opacity = '0.5';
    
}

function updateMessage(e) {
    let comment__principal = e.parentElement.parentElement
    let edit = comment__principal.querySelector('.edit')
    comment__principal.classList.remove('--editable')
    let btnText = comment__principal.querySelector('.textarea')

    let btnDelete = comment__principal.querySelector('.delete');
    btnText.setAttribute('readonly', true);
    updateHeight(btnText);
    edit.style.pointerEvents = 'auto';
    edit.style.opacity = '1';
    btnDelete.style.pointerEvents = 'auto';
    btnDelete.style.opacity = '1';

}



function deleteMessage(e) {
    body.classList.add('overlay')
    deleteMessageBox.style.display = 'flex'

    deleteMsgBtn.addEventListener('click', function() {
       deleteButton(e) 
    })
}

function cancelButton() {
    body.classList.remove('overlay');
    deleteMessageBox.style.display = 'none';
}

function deleteButton(e) {
    body.classList.remove('overlay');
    deleteMessageBox.style.display = 'none';
    let comment__reply = e.parentElement.parentElement.parentElement.parentElement.parentElement;
   comment__reply.remove();
}

function addCommentReply(e,username,parent){
 
    let textarea = e.parentElement.previousElementSibling.firstElementChild;
    let comment__reply__container = e.parentElement.parentElement.parentElement.parentElement.parentElement;
    let comment__card = `<div class="comment__card">
        <div class="comment__likes__container">
            <div class="comment__likes">
                <svg class="plos__like" width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                        fill="#C5C6EF"
                    />
                </svg>
                <span class="likes">0</span>
                <svg class="minus__like" width="11" height="3" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                        fill="#C5C6EF"
                    />
                </svg>
            </div>
        </div>
        <div class="comment__principal">
            <div class="comment__tittle__container">
                <div class="comment__tittle__user">
                    <img src="images/avatars/image-${username}.png" alt="" />
                    <span class="username">${username}</span>
                    <span class="you">you</span>
                    <span class="date">today</span>
                </div>
                <div class="comment__tittle__config">
                    <div class="delete">
                        <img src="images/icon-delete.svg" alt="" />
                        <span>Delete</span>
                    </div>
                    <div class="edit">
                        <img src="images/icon-edit.svg" alt="" />
                        <span>Edit</span>
                    </div>
                </div>
            </div>
            <div class="comment__text">
                <textarea readonly class="textarea"></textarea>
            </div>
            <div class="comment__button">
                <button class="btn-update" type="button">UPDATE</button>
            </div>
        </div>
    </div>`

    if(textarea.value == "") {
        console.log("no hay nada")
        return;
    }
    let div = document.createElement('div');
    div.classList.add('comment__reply');
    div.innerHTML += comment__card;
    let divTextarea =  div.querySelector('.textarea');

    divTextarea.value =  ` @${parent.textContent} ${textarea.value}`
    comment__reply__container.appendChild(div);
    body.style.minHeight += "1000px"
    textarea.value == ""

    document.querySelector('#CommentProcess').remove();
    let botonEdit = div.querySelector('.comment__tittle__config .edit');
    let botonDelete = div.querySelector('.comment__tittle__config .delete');
    let botonUpdate = div.querySelector('.comment__button .btn-update');
    let minus = div.querySelector('.minus__like')
    let plos = div.querySelector('.plos__like')

    
    botonEdit.addEventListener('click', function () {
        editMessage(botonEdit)
    })

    botonDelete.addEventListener('click', function () {
        deleteMessage(botonDelete)
    })

   botonUpdate.addEventListener('click', function() {
        updateMessage(botonUpdate)
   })

   plos.addEventListener('click', function() {
    addLike(plos)
   })

    minus.addEventListener('click', function() {
    removeLike(minus)
})

}



function createCommentProcessS(e,user) {
    if(body.innerHTML.includes('CommentProcess')) {
        document.querySelector('#CommentProcess').remove();
    }

    let comment__card = e.parentElement.parentElement.parentElement.parentElement.parentElement
    let parent = comment__card.querySelector('.username')
    let comment__cardHtml = `<div class="comment__card">
        <div class="comment__process__box">
            <div class="comment__img">
                <img src="images/avatars/image-${user}.png" alt="" />
            </div>
            <div class="comment__text__process">
                <textarea class="textarea"></textarea>
            </div>
            <div class="comment__button">
                <button class="btn-reply" type="button">REPLY</button>
            </div>
        </div>
</div>`;
    let div = document.createElement('div');
    div.classList.add('comment__process')
    div.id = ('CommentProcess')
    div.innerHTML += comment__cardHtml;
    comment__card.insertAdjacentElement("afterend", div);
    let btnReply = div.querySelector('.btn-reply') 
    btnReply.addEventListener('click', function() {
        addCommentReply(btnReply,user,parent);
    })


}

function createCommentProcessF(e,user) {
    if(body.innerHTML.includes('CommentProcess')) {
        document.querySelector('#CommentProcess').remove();
    }


    let comment__container = e.parentElement.parentElement.parentElement.parentElement.parentElement;
    let parent = comment__container.querySelector('.username')
    let comment__reply__container = comment__container.querySelector('.comment__reply__container');
    let comment__card = `<div class="comment__card">
        <div class="comment__process__box">
            <div class="comment__img">
                <img src="images/avatars/image-${user}.png" alt="" />
            </div>
            <div class="comment__text__process">
                <textarea class="textarea"></textarea>
            </div>
            <div class="comment__button">
                <button class="btn-reply" type="button">REPLY</button>
            </div>
        </div>
</div>`;
    let div = document.createElement('div');
    div.classList.add('comment__process')
    div.id = ('CommentProcess')
    div.innerHTML += comment__card;
    comment__reply__container.insertAdjacentElement("afterbegin", div);
    let btnReply = div.querySelector('.btn-reply') 
    btnReply.addEventListener('click', function() {
        addCommentReply(btnReply,user,parent);
    })

    
}

