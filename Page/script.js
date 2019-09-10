const imageWrapperDiv = document.querySelector('#images-wrapper');
console.log(imageWrapperDiv);


// Iframe
// When clicked on 'See codes' - it changes src to github
const iframe = document.querySelector('iframe');
console.log(iframe);

const iframeButton = document.querySelector('#iframe-btn');
iframeButton.addEventListener('click', function() {
    window.open('https://github.com/Laila1222/Laila1222-github.io/blob/master/hyf-homework/html-css/week2/index.html');
})



console.log(sites);

function renderModals (sites) {
    sites.forEach((site) => {
        console.log(site.id);
        const imageDiv = document.createElement('div');
        imageDiv.className = 'col';
        imageWrapperDiv.appendChild(imageDiv);
        imageDiv.innerHTML = `
        <a data-toggle="modal" href=#${site.id}><img src="./images/P8170178.JPG" alt=images"" class="d-block w-100"></a>
        <div class="modal fade" id="${site.id}" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true" >
        <div class="modal-dialog modal-lg" role="document">
            <!-- Content -->
            <div class="modal-content">
                <!-- Body -->
                <div class="modal-body">
        
                    <div  class="embed-responsive embed-responsive-16by9 z-depth-1-half inner-modal-body">
                            
                        <iframe class="embed-responsive-item" allowfullscreen  src="${site.url}" frameborder="0"></iframe>
                    </div>
                    
                </div> <!-- body -->
                
                <!-- Footer -->
                <div class="modal-footer justify-content-center">
                    <span class="mr-4">blablaa</span>
                    <button id="iframe-codes-btn"  class="btn-floating btn-sm btn-fb" >See Codes on GitHub</button>
                    <button id="iframe-same-new-tab" class="btn-floating btn-sm btn-fb">Open in new tab</button>

                </div>

            </div>
            
        </div>
            

    </div>
        `
      
       
        
    })
    };

renderModals(sites);


