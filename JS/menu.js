const pin = document.querySelectorAll(".pin");

const pinImages = {
    ygin: ['Images/chart1/01_graph.png', 'Images/chart1/01_wdcloud.png'],
    ygin2: ['Images/chart2/02_graph.png', 'Images/chart2/02_wdcloud.png'],
    ygin3: ['Images/chart12/12_graph.png', 'Images/chart12/12_wdcloud.png'],
    pj: ['Images/chart3/03_graph.png', 'Images/chart3/03_wdcloud.png'],
    pc: ['Images/chart9/09_graph.png', 'Images/chart9/09_wdcloud.png'],
    pc2: ['Images/chart13/13_graph.png', 'Images/chart13/13_wdcloud.png'],
    gp: ['Images/chart5/05_wdcloud.png', 'Images/chart5/05_graph.png'],
    yuju: ['Images/chart6/06_wdcloud.png', 'Images/chart6/06_graph.png'],
    gc: ['Images/chart7/07_wdcloud.png', 'Images/chart7/07_graph.png'],
    goyg: ['Images/chart8/08_wdcloud.png', 'Images/chart8/08_graph.png'],
    ygpg: ['Images/chart11/11_wdcloud.png', 'Images/chart11/11_graph.png'],
    gmpo: ['Images/chart14/14_wdcloud.png', 'Images/chart14/14_graph.png'],
    ggju: ['Images/chart15/15_wdcloud.png', 'Images/chart15/15_graph.png'],
    sgnm: ['Images/chart16/16_graph.png', 'Images/chart16/16_wdcloud.png'],
    yuwn: ['Images/chart4/04_graph.png', 'Images/chart4/04_wdcloud.png'],
    yuwn2: ['Images/chart10/10_graph.png', 'Images/chart10/10_wdcloud.png']
};

// 왼쪽에 표시할 pin ID 목록
const leftPinIds = ['pc', 'pc2', 'gp', 'ygpg', 'yuju', 'ygin', 'ygin2', 'ygin3'];
// 위에 표시할 pin ID 목록
const abovePinIds = ['ygin', 'ygin2', 'yuwn', 'yuwn2', 'ygin3'];

pin.forEach((data) => {
    data.addEventListener("click", () => {
        const existingDivs = document.querySelectorAll("#menu");
        existingDivs.forEach(div => div.remove());

        const rect = data.getBoundingClientRect();
        const images = pinImages[data.id] || [];
        const width = 600;
        const height = 500;
        const newWidth = width * 1.3; 
        const newHeight = height * 1;

        const newDiv = document.createElement('div');
        newDiv.setAttribute('id', "menu");
        newDiv.style.position = 'fixed';
        newDiv.style.width = `${newWidth}px`;
        newDiv.style.height = `${newHeight}px`;
        newDiv.style.overflow = 'hidden';
        newDiv.style.border = '1px solid black';

        // 왼쪽 또는 오른쪽에 표시
        if (leftPinIds.includes(data.id)) {
            newDiv.style.left = `${rect.left - newWidth}px`; // 왼쪽에 표시
        } else {
            newDiv.style.left = `${rect.right}px`; // 오른쪽에 표시
        }
        
        // 특정 ID에 따라 위에 표시하되, pin을 가리지 않도록 위치 조정
        if (abovePinIds.includes(data.id)) {
            newDiv.style.top = `${rect.top - newHeight + 20}px`; // pin을 가리지 않도록 조정
        } else {
            newDiv.style.top = `${rect.top}px`; // 기본 위치
        }

        if (images.length > 1) {
            const slideContainer = document.createElement('div');
            slideContainer.style.display = 'flex';
            slideContainer.style.transition = 'transform 1s ease'; 
            slideContainer.style.width = `${newWidth * images.length}px`; 

            images.forEach((imageSrc) => {
                const imgDiv = document.createElement('div');
                imgDiv.style.border = '1px solid black'; // 테두리 추가
                imgDiv.style.opacity = 0; // Initially hidden
                imgDiv.style.transition = 'opacity 1s ease'; // Fade-in effect
                const img = document.createElement('img');
                img.src = imageSrc;
                img.style.width = `${newWidth}px`;
                img.style.height = `${newHeight}px`;
                img.style.objectFit = 'cover';
                imgDiv.appendChild(img);
                imgDiv.style.flexShrink = '0';
                slideContainer.appendChild(imgDiv);
                
                // Fade in the image and border
                setTimeout(() => {
                    imgDiv.style.opacity = 1; // Fade in the image and border
                }, 100);
            });

            newDiv.appendChild(slideContainer);
            document.body.appendChild(newDiv);

            let currentIndex = 0;

            const slideInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % images.length; 
                slideContainer.style.transform = `translateX(-${currentIndex * newWidth}px)`; 
                
                // Reset opacity for the next image
                const currentImageDiv = slideContainer.children[currentIndex];
                const previousImageDiv = slideContainer.children[(currentIndex - 1 + images.length) % images.length];
                
                previousImageDiv.style.opacity = 0; // Hide previous image and border
                setTimeout(() => {
                    currentImageDiv.style.opacity = 1; // Fade in new image and border
                }, 100);
            }, 6000); 

            newDiv.addEventListener("mouseout", () => {
                clearInterval(slideInterval);
                newDiv.remove();
            });
        } else if (images.length === 1) {
            const imgDiv = document.createElement('div');
            imgDiv.style.border = '1px solid black'; // 테두리 추가
            imgDiv.style.opacity = 0; // Initially hidden
            imgDiv.style.transition = 'opacity 1s ease'; // Fade-in effect
            const img = document.createElement('img');
            img.style.width = `${newWidth}px`;
            img.style.height = `${newHeight}px`;
            img.style.objectFit = 'cover';
            img.src = images[0];
            imgDiv.appendChild(img);
            newDiv.appendChild(imgDiv);

            document.body.appendChild(newDiv);

            // Fade in the image and border
            setTimeout(() => {
                imgDiv.style.opacity = 1; // Fade in the image and border
            }, 100);
        }
    });
});
