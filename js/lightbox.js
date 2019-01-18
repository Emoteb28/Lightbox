//Fichier LightBox JQuery

$(document).ready(function () {
    console.log('ok');

    let lightbox = (function () {
        return {
        modules : {}
        };
    })();

    //Les actions
    lightbox.modules.actions = (function () {
    //Ajouter modal
    function _addModal(selecteur) {
        let src_img = $(selecteur).find('img').attr('data-img');
        let title_img = $(selecteur).find('div').html();
        $(`<div class="modal">
                <div id="modal_content">
                    <form class="form" action="javascript:void(0)">
                        <textarea id="mytextarea" name="mytextarea" required></textarea>
                        <button type="button" class="add">ADD</button>
                    </form>
                        
                     <img class="imgSelected" src="${src_img}" alt="selected">
                     <p class="titleSelected">${title_img}</p>
                     <button type="button" class="modal_close">&#10006;</button>
                     <button type="button" class="modal_right">&#10511;</button>
                     <button type="button" class="modal_left">&#10510;</button>
                         <div class="comments"></div>
              </div>
            </div>
        `).insertAfter('#My-lightbox-galery');
        _syncComments(src_img)
    }

    //Synch les commentaires
    function _syncComments(src_img) {
        let pComments = "";
        if (JSON.parse(localStorage.getItem(src_img)) != null){
            let i=0;
            myComments.forEach(element => {
                pComments+= `<div class='comment-container'>
            <div id='comment-edit-delete${i}' class='comment-edit-delete'>
            <p class='comment'>${element}</p>
            <button class='remove' type='button' data-index="${i}">&#9851;></button>
            <button class='edit' type='button' data-index="${i}">&#9998;</button>
            </div>
            <form id='form-update${i}' class='form-update' action="javascript:void(0)">
                <textarea id='form-update${i}' name='updatextarea' required>${element}</textarea>
                <button type='button' class='cancel' data-index="${i}">&#9746;</button>
                <button type='button' class='update' data-index="${i}">&#9745;</button>
            </form>
            </div>;
            i++;                 `
            })
        }
    $('.comments').html(pComments);
    }

    //Suppr un commentaire
    function _removeComment(selecteur) {
        let selected_src_img = $('.imgSelected').attr('src');
        let selectedComment = $(selecteur).attr('data-index');

        if (JSON.parse(localStorage.getItem(selected_src_img)) !=null){
            myComments = JSON.parse(localStorage.getItem(selected_src_img));
            myComments.splice(selectedComment, 1);
            localStorage.setItem(selected_src_img, JSON.stringify(myComments));
        }
        _syncComments(selected_src_img);
    }

    //Modif un comm
    function _updateComment(selecteur) {
        let selected_src_img = $('.imgSelected').attr('src');
        let selectedComment = $(selecteur).attr('data_index');
        let newComment = $(`#updatetextarea${selectComment}`).val();

        if (newComment !== null && newComment !== '') {
            let myComments = JSON.parse(localStorage.getItem(selected_src_img));
            myComments[selectedComment] = newComment;
            localStorage.setItem(selected_src_img, JSON.stringify(myComments));
        }
        _syncComments(selected_src_img);
    }

    //Masquer formulaire de modif
    function _showCommentEditDelete(selecteur) {
        let selectedComment = $(selecteur).attr('data-index');
    }

    // Supp un modal du DOM
    function _closeModal() {
        $('.modal').remove();
    }

    //Photo suivante
    function _rightModal() {
        let selected_src_img = $('.imgSelected').attr('src');
        let currentVignette = $(`.vignette img[data-img='${selected_src_img}']`).attr('data-img').parent();
        let nextVignette = currentVignette.next();
        let src_img = '';

        if (currentVignette.is(':last-child')){
        let first_src_img = $('.vignette:first-child').find('img').attr('data-img');
        src_img = first_src_img;
        titleSelected = $('.vignette:first-child').find('div').html();
        } else {
            let nextSrc_img = nextVignette.find('img').attr('data-img');
            src_img = nextSrc_img;
            titleSelected = nextVignette.find('div').html();
        }
        $('.imgSelected').attr('src, src-img');
        $('.titleSelected').text(titleSelected);
        _syncComments(src_img);
        }

    //Photo précedente
    function _leftModal() {
        let selected_src_img = $('.imgSelected').attr('src');
        let currentVignette = $(`.vignette img[data-img='${selected_src_img}']`).parent();
        let prevVignette = currentVignette.prev();
        let titleSelect = '';
        let src_img ='';
        if (currentVignette.is(':first:child')){

        }
    }

    });
});
