import PhotoSwipeLightbox, { type EventCallback } from 'photoswipe/lightbox';
import type { CarouselAPI } from '../ui/carousel/context';

// Icon copied from lucide X icon to be able to use it with PhotoSwipe
const closeSvgString =
	'<svg aria-hidden="true" class="pswp__icn" viewBox="0 0 50 30" width="50" height="30"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--pswp-icon-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></svg>';

export function setUpLightboxWithYouTube(
	galleryId: string,
	onBeforeOpen?: () => void,
	onDestroy?: () => void,
	emblaApi?: CarouselAPI
) {
	const lightbox = new PhotoSwipeLightbox({
		zoom: false,
		closeSVG: closeSvgString,

		gallery: '#' + galleryId,
		children: 'a',
		pswpModule: () => import('photoswipe')
	});

	lightbox.init();

	if (emblaApi) {
		lightbox.on('contentActivate', (event) => {
			emblaApi.scrollTo(event.content.index);
		});
	}

	if (onBeforeOpen) {
		lightbox.on('beforeOpen', onBeforeOpen);
	}

	if (onDestroy) {
		lightbox.on('destroy', onDestroy);
	}

	lightbox.addFilter('itemData', (itemData) => {
		const youtubeUrl = itemData.element?.dataset.youtubeUrl;
		if (youtubeUrl) {
			itemData.youtubeUrl = youtubeUrl;
		}
		return itemData;
	});

	lightbox.on('contentLoad', onContentLoad);

	return () => {
		lightbox.destroy();
	};
}

const onContentLoad: EventCallback<'contentLoad'> = (e) => {
	const { content } = e;
	if (content.type === 'youtube') {
		e.preventDefault();

		content.element = document.createElement('div');
		content.element.className = 'pswp__youtube-container';

		content.element.style.position = 'relative';
		content.element.style.width = '100%';
		content.element.style.height = '100%';
		content.element.style.pointerEvents = 'none';

		const iframe = document.createElement('iframe');
		iframe.src = content.data.youtubeUrl;
		iframe.setAttribute('allowfullscreen', '');
		iframe.setAttribute('frameborder', '0');
		iframe.setAttribute(
			'allow',
			'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
		);
		iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');

		iframe.style.width = '100%';
		iframe.style.aspectRatio = '1/1';
		iframe.style.pointerEvents = 'auto';
		iframe.style.position = 'absolute';
		iframe.style.top = '50%';
		iframe.style.left = '50%';
		iframe.style.transform = 'translate(-50%, -50%)';

		content.element.appendChild(iframe);
	}
};
