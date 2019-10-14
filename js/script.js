// Variables
const jsImageWrapperDiv = document.querySelector ('#images-wrapper-js');
const cssImageWrappedDiv = document.querySelector ('#images-wrapper-css');
const nodeImageWrapperDiv = document.querySelector ('#images-wrapper-node');

// Functions
const appendInnerHtml = (el, arrayEl) => {
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
                                <span class="mr-4">For full experience:</span>
                                <button id="iframe-codes-btn" onclick="openCodes('${arrayEl.codesUrl}')" class="btn btn-info btn-floating btn-sm" >See Codes on GitHub</button>
                                <button id="iframe-same-new-tab" onclick="openInNewTab('${arrayEl.url}')" class="btn btn-info btn-floating btn-sm">Open in new tab</button>
                            </div>

                        </div> <!-- modal-content -->
                    </div> <!-- modal-dialog -->
                </div> <!-- modal -->
            `;
};

const renderModals = (sites, div, idName) => {
  sites.forEach (site => {
    const imageDiv = document.createElement ('div');
    imageDiv.id = idName;
    imageDiv.className = 'col-12 col-sm-6 flash-hover py-5';
    div.appendChild (imageDiv);
    appendInnerHtml (imageDiv, site);
  });
};
// Open link containing codes when clicked
const openCodes = link => {
  window.open (link, '_blank');
  // console.log(link);
};
// Open link in tab when clicked
const openInNewTab = link => {
  window.open (link, '_blank');
  // console.log(link);
};

renderModals (sitesJavaScript, jsImageWrapperDiv, 'jsDiv');
renderModals (sitesHtmlCss, cssImageWrappedDiv, 'cssDiv');
renderModals (sitesNodejs, nodeImageWrapperDiv, 'nodeDiv');

// Place the only nodejs project into middle
const nodejsDiv = document.querySelector('#nodeDiv');
nodejsDiv.classList.remove('col-sm-6');
