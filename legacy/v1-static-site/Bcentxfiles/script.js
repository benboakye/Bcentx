// Bcentx Main JavaScript File

function getSameOriginReferrer() {
	if (!document.referrer) {
		return "";
	}

	try {
		const refUrl = new URL(document.referrer);
		return refUrl.origin === window.location.origin ? document.referrer : "";
	} catch (_error) {
		return "";
	}
}

function initPreviousPageLinks() {
	const previousLinks = document.querySelectorAll("[data-back-nav]");
	if (!previousLinks.length) {
		return;
	}

	const sameOriginReferrer = getSameOriginReferrer();

	previousLinks.forEach((link) => {
		const fallbackHref = link.getAttribute("data-fallback-href") || "../index.html";
		link.setAttribute("href", sameOriginReferrer || fallbackHref);

		link.addEventListener("click", (event) => {
			if (sameOriginReferrer && window.history.length > 1) {
				event.preventDefault();
				window.history.back();
			}
		});
	});
}

document.addEventListener("DOMContentLoaded", () => {
	initPreviousPageLinks();
});
