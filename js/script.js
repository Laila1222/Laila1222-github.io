const jsImageWrapperDiv = document.querySelector('#images-wrapper-js');
const cssImageWrappedDiv = document.querySelector('#images-wrapper-css');







function appendInnerHtml (el, arrayEl) {
    el.innerHTML = `
                <a data-toggle="modal"  href=#${arrayEl.id}><img src="${arrayEl.image}" alt="images" class="w-75 shadow"></a>
                <div class="modal fade" id="${arrayEl.id}" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true" >
                <div class="modal-dialog modal-lg" role="document">
                    <!-- Content -->
                    <div class="modal-content">
                        <!-- Body -->
                        <div class="modal-body">

                            <div  class="embed-responsive embed-responsive-16by9 z-depth-1-half inner-modal-body">
                                    
                                <iframe class="embed-responsive-item" allowfullscreen  src="${arrayEl.url}" frameborder="0"></iframe>
                            </div>
                            
                        </div> <!-- body -->
                        
                        <!-- Footer -->
                        <div class="modal-footer justify-content-center">
                            <span class="mr-4">blablaa</span>
                            <button id="iframe-codes-btn" onclick="openCodes('${arrayEl.codesUrl}')" class="btn btn-info btn-floating btn-sm" >See Codes on GitHub</button>
                            <button id="iframe-same-new-tab" onclick="openNewTab('${arrayEl.url}')" class="btn btn-info btn-floating btn-sm">Open in new tab</button>

                        </div>

                    </div>
                    
                </div>
                    

            </div>
            `

}



function renderModals (sites, div) {
    sites.forEach((site) => {
        const imageDiv = document.createElement('div');
        imageDiv.className = "col-12 col-md-6 flash-hover py-5";
        div.appendChild(imageDiv);
        appendInnerHtml(imageDiv, site);  
    })
};

const openCodes = (link) => {
    window.open(link, '_blank');
    // console.log(link);
}

const openNewTab = (link) => {
    window.open(link, '_blank');
    // console.log(link);
}


renderModals(sitesJavaScript, jsImageWrapperDiv);
renderModals(sitesHmlCss, cssImageWrappedDiv);