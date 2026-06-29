import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { Link, Links, Meta, Outlet, Scripts, ScrollRestoration, ServerRouter, UNSAFE_withComponentProps, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Fragment as Fragment$1, useCallback, useEffect, useMemo, useRef, useState } from "react";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region node_modules/@react-router/dev/dist/config/defaults/entry.server.node.tsx
var entry_server_node_exports = /* @__PURE__ */ __exportAll({
	default: () => handleRequest,
	streamTimeout: () => streamTimeout
});
var streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
	if (request.method.toUpperCase() === "HEAD") return new Response(null, {
		status: responseStatusCode,
		headers: responseHeaders
	});
	return new Promise((resolve, reject) => {
		let shellRendered = false;
		let userAgent = request.headers.get("user-agent");
		let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
		let timeoutId = setTimeout(() => abort(), 6e3);
		const { pipe, abort } = renderToPipeableStream(/* @__PURE__ */ jsx(ServerRouter, {
			context: routerContext,
			url: request.url
		}), {
			[readyOption]() {
				shellRendered = true;
				const body = new PassThrough({ final(callback) {
					clearTimeout(timeoutId);
					timeoutId = void 0;
					callback();
				} });
				const stream = createReadableStreamFromReadable(body);
				responseHeaders.set("Content-Type", "text/html");
				pipe(body);
				resolve(new Response(stream, {
					headers: responseHeaders,
					status: responseStatusCode
				}));
			},
			onShellError(error) {
				reject(error);
			},
			onError(error) {
				responseStatusCode = 500;
				if (shellRendered) console.error(error);
			}
		});
	});
}
//#endregion
//#region app/root.tsx
var root_exports = /* @__PURE__ */ __exportAll({
	ErrorBoundary: () => ErrorBoundary,
	Layout: () => Layout,
	default: () => root_default,
	links: () => links
});
var links = () => [
	{
		rel: "preconnect",
		href: "https://fonts.googleapis.com"
	},
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous"
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
	}
];
function Layout({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsxs("head", { children: [
			/* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
			/* @__PURE__ */ jsx("meta", {
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			}),
			/* @__PURE__ */ jsx(Meta, {}),
			/* @__PURE__ */ jsx(Links, {})
		] }), /* @__PURE__ */ jsxs("body", { children: [
			children,
			/* @__PURE__ */ jsx(ScrollRestoration, {}),
			/* @__PURE__ */ jsx(Scripts, {})
		] })]
	});
}
var root_default = UNSAFE_withComponentProps(function App() {
	return /* @__PURE__ */ jsx(Outlet, {});
});
var ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary({ error }) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack;
	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
	}
	return /* @__PURE__ */ jsxs("main", {
		className: "pt-16 p-4 container mx-auto",
		children: [
			/* @__PURE__ */ jsx("h1", { children: message }),
			/* @__PURE__ */ jsx("p", { children: details }),
			stack
		]
	});
});
//#endregion
//#region app/cantata_app/data/addons.ts
var addons = [
	{
		id: "extra-espresso",
		name: "Доп. эспрессо",
		price: 60
	},
	{
		id: "coconut-milk",
		name: "Кокосовое молоко",
		price: 50
	},
	{
		id: "caramel-syrup",
		name: "Сироп карамель",
		price: 40
	},
	{
		id: "vanilla-syrup",
		name: "Сироп ваниль",
		price: 40
	},
	{
		id: "ice",
		name: "Лёд",
		price: 20
	}
];
//#endregion
//#region app/cantata_app/data/drinks.ts
var IMG_SALTED = "https://storage.yandexcloud.net/junktest/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%C2%A0%E2%80%94%202026-06-06%20%D0%B2%C2%A015.04.22.png";
var IMG_HALVA = IMG_SALTED;
var IMG_CHEESE = "https://storage.yandexcloud.net/junktest/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%C2%A0%E2%80%94%202026-06-06%20%D0%B2%C2%A015.05.16.png";
var IMG_MATCHA = "https://storage.yandexcloud.net/junktest/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%C2%A0%E2%80%94%202026-06-06%20%D0%B2%C2%A015.05.27.png";
var IMG_ASSAM = "https://storage.yandexcloud.net/junktest/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%C2%A0%E2%80%94%202026-06-06%20%D0%B2%C2%A015.05.35.png";
var IMG_ASSAM_DETAIL = "https://storage.yandexcloud.net/junktest/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%C2%A0%E2%80%94%202026-06-06%20%D0%B2%C2%A015.05.46.png";
var drinks = [
	{
		id: "salted-caramel",
		category: "КАПУЧИНО",
		displayName: "Крафтовая солёная карамель",
		name: "КРАФТОВАЯ СОЛЁНАЯ КАРАМЕЛЬ",
		description: "Авторская солёная карамель, корица.",
		sizes: [{
			volume: 400,
			calories: 252
		}],
		pastelAccent: "#F8F4EB",
		image: IMG_SALTED,
		catalogCategory: "coffee",
		catalogTab: "cappuccino",
		media: [
			{
				type: "video",
				src: "https://storage.yandexcloud.net/junktest/6530753_Coffee%20Woman%20Faceless%20Wellness_By_Content_Kiosk_Artlist_Vertical_HD.mp4"
			},
			{
				type: "video",
				src: "https://storage.yandexcloud.net/junktest/6163021_Coffee%20Powder%20Process%20Grounded_By_Dmitrii_Borovikov_Artlist_Vertical_HD.mp4"
			},
			{
				type: "image",
				src: IMG_CHEESE,
				duration: 4500
			},
			{
				type: "image",
				src: IMG_MATCHA,
				duration: 4500
			}
		],
		basePrice: 320
	},
	{
		id: "hvala-halva",
		category: "ЛАТТЕ",
		displayName: "Хвала халве",
		name: "ХВАЛА ХАЛВЕ",
		description: "Халва, лесной орех, семечки.",
		sizes: [{
			volume: 300,
			calories: 304
		}, {
			volume: 400,
			calories: 424
		}],
		image: IMG_HALVA,
		catalogCategory: "coffee",
		catalogTab: "latte",
		media: [
			{
				type: "image",
				src: IMG_HALVA
			},
			{
				type: "image",
				src: IMG_CHEESE,
				duration: 5e3
			},
			{
				type: "image",
				src: IMG_MATCHA,
				duration: 5e3
			}
		],
		pastelAccent: "#F5F2DD",
		basePrice: 340
	},
	{
		id: "cheese-latte",
		category: "ЛАТТЕ",
		displayName: "Сырный латте",
		name: "СЫРНЫЙ ЛАТТЕ",
		description: "Настоящий сыр, соль с розой.",
		sizes: [{
			volume: 300,
			calories: 243
		}, {
			volume: 400,
			calories: 310
		}],
		image: IMG_CHEESE,
		catalogCategory: "signature",
		catalogTab: "latte",
		media: [
			{
				type: "image",
				src: IMG_CHEESE
			},
			{
				type: "image",
				src: IMG_HALVA,
				duration: 4500
			},
			{
				type: "image",
				src: IMG_MATCHA,
				duration: 4500
			}
		],
		pastelAccent: "#F8EBEF",
		basePrice: 360
	},
	{
		id: "matcha-coconut",
		category: "МАТЧА",
		displayName: "На кокосовом",
		name: "МАТЧА НА КОКОСОВОМ",
		description: "Матча Удзи, кокосовое молоко.",
		sizes: [{
			volume: 300,
			calories: 114
		}],
		image: IMG_MATCHA,
		catalogCategory: "signature",
		catalogTab: "matcha",
		media: [
			{
				type: "image",
				src: IMG_MATCHA
			},
			{
				type: "image",
				src: IMG_ASSAM,
				duration: 4500
			},
			{
				type: "image",
				src: IMG_ASSAM_DETAIL,
				duration: 4500
			}
		],
		pastelAccent: "#E7F6F2",
		basePrice: 380
	},
	{
		id: "assam-secret",
		category: "АВТОРСКИЙ ЧАЙ",
		displayName: "Секрет Ассама",
		name: "СЕКРЕТ АССАМА",
		description: "Ассам, тоник, маракуйя, лимонный сок. Готовим в холодном виде.",
		sizes: [{
			volume: 300,
			calories: 89
		}],
		image: IMG_ASSAM,
		detailImage: IMG_ASSAM_DETAIL,
		catalogCategory: "tea",
		catalogTab: "tea",
		media: [
			{
				type: "image",
				src: IMG_ASSAM
			},
			{
				type: "image",
				src: IMG_ASSAM_DETAIL,
				duration: 5500
			},
			{
				type: "image",
				src: IMG_MATCHA,
				duration: 4500
			}
		],
		pastelAccent: "#EAF0F9",
		basePrice: 280
	}
];
var getDrinkById = (id) => drinks.find((drink) => drink.id === id);
var getDrinkMedia = (drink) => {
	if (drink.media?.length) return drink.media;
	const fallback = drink.detailImage ?? drink.image;
	if (!fallback) return [];
	return [{
		type: "image",
		src: fallback
	}];
};
var getVolumeLabel = (drink) => drink.sizes.map((size) => size.volume).join(" / ") + " мл";
var getVolumePrice = (drink, volume) => {
	const baseVolume = drink.sizes[0]?.volume ?? 300;
	return Math.round(drink.basePrice * (volume / baseVolume));
};
//#endregion
//#region app/cantata_app/data/cart.ts
var getCartItemKey = (drinkId, volume, addonIds) => `${drinkId}:${volume}:${[...addonIds].sort().join(",")}`;
var getCartTotal = (items) => items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
var getCartCount = (items) => items.reduce((sum, item) => sum + item.quantity, 0);
var getCartItemLabel = (item) => {
	if (!getDrinkById(item.drinkId)) return "";
	const addonNames = addons.filter((addon) => item.addonIds.includes(addon.id)).map((addon) => addon.name);
	return [item.volume + " мл", ...addonNames].join(" · ");
};
//#endregion
//#region app/cantata_app/components/icons.tsx
var IconHome$1 = ({ size = 22, className }) => /* @__PURE__ */ jsxs("svg", {
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.75",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	className,
	children: [
		/* @__PURE__ */ jsx("path", { d: "M5 12l-2 0l9 -9l9 9l-2 0" }),
		/* @__PURE__ */ jsx("path", { d: "M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" }),
		/* @__PURE__ */ jsx("path", { d: "M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" })
	]
});
var IconCatalog = ({ size = 22, className }) => /* @__PURE__ */ jsxs("svg", {
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.75",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	className,
	children: [
		/* @__PURE__ */ jsx("path", { d: "M4 4h6v6h-6z" }),
		/* @__PURE__ */ jsx("path", { d: "M14 4h6v6h-6z" }),
		/* @__PURE__ */ jsx("path", { d: "M4 14h6v6h-6z" }),
		/* @__PURE__ */ jsx("path", { d: "M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" })
	]
});
var IconStores = ({ size = 22, className }) => /* @__PURE__ */ jsxs("svg", {
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.75",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	className,
	children: [/* @__PURE__ */ jsx("path", { d: "M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" }), /* @__PURE__ */ jsx("path", { d: "M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" })]
});
var IconCart = ({ size = 22, className }) => /* @__PURE__ */ jsxs("svg", {
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.75",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	className,
	children: [
		/* @__PURE__ */ jsx("path", { d: "M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" }),
		/* @__PURE__ */ jsx("path", { d: "M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" }),
		/* @__PURE__ */ jsx("path", { d: "M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2 -1.61l1.6 -8.39h-15.32" })
	]
});
var IconProfile$1 = ({ size = 22, className }) => /* @__PURE__ */ jsxs("svg", {
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.75",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	className,
	children: [/* @__PURE__ */ jsx("path", { d: "M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" }), /* @__PURE__ */ jsx("path", { d: "M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" })]
});
var IconSearch$1 = ({ size = 20, className }) => /* @__PURE__ */ jsxs("svg", {
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.75",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	className,
	children: [/* @__PURE__ */ jsx("path", { d: "M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" }), /* @__PURE__ */ jsx("path", { d: "M21 21l-6 -6" })]
});
var IconMenu = ({ size = 22, className }) => /* @__PURE__ */ jsxs("svg", {
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.75",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	className,
	children: [
		/* @__PURE__ */ jsx("path", { d: "M4 6l16 0" }),
		/* @__PURE__ */ jsx("path", { d: "M4 12l16 0" }),
		/* @__PURE__ */ jsx("path", { d: "M4 18l16 0" })
	]
});
var IconPin = ({ size = 13, className }) => /* @__PURE__ */ jsxs("svg", {
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.75",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	className,
	children: [/* @__PURE__ */ jsx("path", { d: "M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" }), /* @__PURE__ */ jsx("path", { d: "M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" })]
});
var IconBack = ({ size = 18, className }) => /* @__PURE__ */ jsxs("svg", {
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	className,
	children: [
		/* @__PURE__ */ jsx("path", { d: "M5 12l14 0" }),
		/* @__PURE__ */ jsx("path", { d: "M5 12l6 6" }),
		/* @__PURE__ */ jsx("path", { d: "M5 12l6 -6" })
	]
});
var IconHeart = ({ size = 20, className }) => /* @__PURE__ */ jsx("svg", {
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.75",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	className,
	children: /* @__PURE__ */ jsx("path", { d: "M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" })
});
var IconPlus$2 = ({ size = 14, className }) => /* @__PURE__ */ jsxs("svg", {
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2.5",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	className,
	children: [/* @__PURE__ */ jsx("path", { d: "M12 5l0 14" }), /* @__PURE__ */ jsx("path", { d: "M5 12l14 0" })]
});
var IconRepeat = ({ size = 11, className }) => /* @__PURE__ */ jsxs("svg", {
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	className,
	children: [/* @__PURE__ */ jsx("path", { d: "M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" }), /* @__PURE__ */ jsx("path", { d: "M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" })]
});
var IconChevronRight$1 = ({ size = 12, className }) => /* @__PURE__ */ jsx("svg", {
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2.5",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	className,
	children: /* @__PURE__ */ jsx("path", { d: "M9 6l6 6l-6 6" })
});
var IconTag = ({ size = 28, className }) => /* @__PURE__ */ jsxs("svg", {
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.75",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	className,
	children: [/* @__PURE__ */ jsx("path", { d: "M7.5 7.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" }), /* @__PURE__ */ jsx("path", { d: "M3 6v5.172a2 2 0 0 0 .586 1.414l7.71 7.71a2.41 2.41 0 0 0 3.408 0l5.592 -5.592a2.41 2.41 0 0 0 0 -3.408l-7.71 -7.71a2 2 0 0 0 -1.414 -.586h-5.172a3 3 0 0 0 -3 3z" })]
});
var IconGift = ({ size = 28, className }) => /* @__PURE__ */ jsxs("svg", {
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.75",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	className,
	children: [
		/* @__PURE__ */ jsx("path", { d: "M3 8m0 1a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1z" }),
		/* @__PURE__ */ jsx("path", { d: "M12 8l0 13" }),
		/* @__PURE__ */ jsx("path", { d: "M19 12v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-7" }),
		/* @__PURE__ */ jsx("path", { d: "M7.5 8a2.5 2.5 0 0 1 0 -5a4.8 8 0 0 1 4.5 5a4.8 8 0 0 1 4.5 -5a2.5 2.5 0 0 1 0 5" })
	]
});
var IconTicket = ({ size = 14, className }) => /* @__PURE__ */ jsxs("svg", {
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.75",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	className,
	children: [
		/* @__PURE__ */ jsx("path", { d: "M15 5l0 2" }),
		/* @__PURE__ */ jsx("path", { d: "M15 11l0 2" }),
		/* @__PURE__ */ jsx("path", { d: "M15 17l0 2" }),
		/* @__PURE__ */ jsx("path", { d: "M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2" })
	]
});
var IconChevronDown$2 = ({ size = 16, className }) => /* @__PURE__ */ jsx("svg", {
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	className,
	children: /* @__PURE__ */ jsx("path", { d: "M6 9l6 6l6 -6" })
});
var IconClipboard = ({ size = 17, className }) => /* @__PURE__ */ jsxs("svg", {
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.75",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	className,
	children: [/* @__PURE__ */ jsx("path", { d: "M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" }), /* @__PURE__ */ jsx("path", { d: "M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" })]
});
var IconTrash = ({ size = 17, className }) => /* @__PURE__ */ jsxs("svg", {
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.75",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	className,
	children: [
		/* @__PURE__ */ jsx("path", { d: "M4 7l16 0" }),
		/* @__PURE__ */ jsx("path", { d: "M10 11l0 6" }),
		/* @__PURE__ */ jsx("path", { d: "M14 11l0 6" }),
		/* @__PURE__ */ jsx("path", { d: "M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" }),
		/* @__PURE__ */ jsx("path", { d: "M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" })
	]
});
var IconCartAdd = ({ size = 18, className }) => /* @__PURE__ */ jsxs("svg", {
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.75",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	className,
	children: [
		/* @__PURE__ */ jsx("path", { d: "M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" }),
		/* @__PURE__ */ jsx("path", { d: "M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" }),
		/* @__PURE__ */ jsx("path", { d: "M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2 -1.61l1.6 -8.39h-15.32" }),
		/* @__PURE__ */ jsx("path", { d: "M15 6h6m-3 -3v6" })
	]
});
var IconCheckout = ({ size = 18, className }) => /* @__PURE__ */ jsxs("svg", {
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.75",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	className,
	children: [
		/* @__PURE__ */ jsx("path", { d: "M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" }),
		/* @__PURE__ */ jsx("path", { d: "M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" }),
		/* @__PURE__ */ jsx("path", { d: "M9 14l2 2l4 -4" })
	]
});
var IconFilter = ({ size = 14, className }) => /* @__PURE__ */ jsxs("svg", {
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.75",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	className,
	children: [
		/* @__PURE__ */ jsx("path", { d: "M4 6h16" }),
		/* @__PURE__ */ jsx("path", { d: "M7 12h10" }),
		/* @__PURE__ */ jsx("path", { d: "M10 18h4" })
	]
});
//#endregion
//#region app/cantata_app/components/BackButton.tsx
var BackButton$1 = ({ onClick, variant = "ghost" }) => /* @__PURE__ */ jsx("button", {
	type: "button",
	onClick,
	className: `cantata-hbtn ${variant === "pill" ? "cantata-hbtn--pill" : "cantata-hbtn--ghost"}`,
	"aria-label": "Назад",
	children: /* @__PURE__ */ jsx(IconBack, {})
});
//#endregion
//#region app/cantata_app/components/BottomNav.tsx
var tabs$2 = [
	{
		id: "home",
		label: "Главная",
		icon: IconHome$1
	},
	{
		id: "catalog",
		label: "Каталог",
		icon: IconCatalog
	},
	{
		id: "stores",
		label: "Магазины",
		icon: IconStores,
		stub: true
	},
	{
		id: "cart",
		label: "Корзина",
		icon: IconCart
	},
	{
		id: "profile",
		label: "Профиль",
		icon: IconProfile$1,
		stub: true
	}
];
var BottomNav = ({ activeTab, cartCount, onTabChange }) => /* @__PURE__ */ jsx("nav", {
	className: "cantata-bnav",
	children: tabs$2.map(({ id, label, icon: Icon, stub }) => {
		const isActive = activeTab === id;
		return /* @__PURE__ */ jsxs("button", {
			type: "button",
			onClick: () => !stub && onTabChange(id),
			className: `cantata-bni ${isActive ? "cantata-bni--a" : ""} ${stub ? "cursor-default opacity-60" : ""}`,
			"aria-label": label,
			"aria-current": isActive ? "page" : void 0,
			children: [
				/* @__PURE__ */ jsx(Icon, {}),
				/* @__PURE__ */ jsx("span", { children: label }),
				id === "cart" && cartCount > 0 && /* @__PURE__ */ jsx("span", {
					className: "cantata-bni-badge",
					children: cartCount
				})
			]
		}, id);
	})
});
//#endregion
//#region app/cantata_app/components/CtaButton.tsx
var CtaButton = ({ children, onClick, className = "" }) => /* @__PURE__ */ jsx("button", {
	type: "button",
	onClick,
	className: `cantata-ctabtn ${className}`,
	children
});
//#endregion
//#region app/cantata_app/screens/CartScreen.tsx
var CartScreen = ({ activeTab, cartCount, items, onTabChange, onBack, onOpenCatalog, onUpdateQuantity, onRemoveItem }) => {
	const total = getCartTotal(items);
	const drinkCount = items.reduce((sum, item) => sum + item.quantity, 0);
	return /* @__PURE__ */ jsxs("div", {
		className: "cantata-sc",
		children: [
			/* @__PURE__ */ jsxs("header", {
				className: "cantata-shdr",
				children: [
					/* @__PURE__ */ jsx(BackButton$1, {
						onClick: onBack,
						variant: "pill"
					}),
					/* @__PURE__ */ jsx("span", {
						className: "cantata-htitle",
						children: "Корзина"
					}),
					/* @__PURE__ */ jsx("div", { className: "w-[38px]" })
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "cantata-scont cantata-hide-scrollbar px-5",
				children: items.length === 0 ? /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col items-center justify-center py-20 text-center",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "mb-2 text-base font-semibold text-[var(--text-ink)]",
							children: "Корзина пуста"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mb-6 text-sm text-[var(--text-sub)]",
							children: "Добавьте напитки из каталога"
						}),
						/* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: onOpenCatalog,
							className: "cantata-tp cantata-tp--a",
							children: "Перейти в каталог"
						})
					]
				}) : /* @__PURE__ */ jsxs(Fragment, { children: [
					items.map((item) => {
						const drink = getDrinkById(item.drinkId);
						if (!drink) return null;
						return /* @__PURE__ */ jsxs("div", {
							className: "cantata-citem",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "cantata-citem__thumb",
									children: drink.image && /* @__PURE__ */ jsx("img", {
										src: drink.image,
										alt: drink.displayName
									})
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "cantata-citem__mid",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "cantata-citem__nm",
											children: [
												drink.category,
												" «",
												drink.displayName,
												"»"
											]
										}),
										/* @__PURE__ */ jsx("div", {
											className: "cantata-citem__opt",
											children: getCartItemLabel(item)
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "cantata-citem__price",
											children: [item.unitPrice * item.quantity, " ₽"]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "cantata-citem__actions",
											children: [
												/* @__PURE__ */ jsx("span", {
													className: "cantata-citem__icon",
													children: /* @__PURE__ */ jsx(IconClipboard, {})
												}),
												/* @__PURE__ */ jsx("span", {
													className: "cantata-citem__icon",
													children: /* @__PURE__ */ jsx(IconHeart, { size: 20 })
												}),
												/* @__PURE__ */ jsx("button", {
													type: "button",
													onClick: () => onRemoveItem(item.id),
													className: "cantata-citem__icon",
													"aria-label": "Удалить",
													children: /* @__PURE__ */ jsx(IconTrash, {})
												})
											]
										})
									]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "cantata-citem__right",
									children: /* @__PURE__ */ jsxs("div", {
										className: "cantata-cqstepper",
										children: [
											/* @__PURE__ */ jsx("button", {
												type: "button",
												onClick: () => onUpdateQuantity(item.id, item.quantity - 1),
												className: "cantata-cqbtn",
												"aria-label": "Уменьшить",
												children: "−"
											}),
											/* @__PURE__ */ jsx("span", {
												className: "cantata-cqval",
												children: item.quantity
											}),
											/* @__PURE__ */ jsx("button", {
												type: "button",
												onClick: () => onUpdateQuantity(item.id, item.quantity + 1),
												className: "cantata-cqbtn",
												"aria-label": "Увеличить",
												children: "+"
											})
										]
									})
								})
							]
						}, item.id);
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "cantata-promo-row",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "flex items-center",
							children: [/* @__PURE__ */ jsx("span", {
								className: "mr-1.5",
								style: { color: "var(--cinnamon)" },
								children: /* @__PURE__ */ jsx(IconTicket, {})
							}), "У меня есть промокод"]
						}), /* @__PURE__ */ jsx(IconChevronDown$2, {})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "cantata-totals",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "cantata-trow",
							children: [/* @__PURE__ */ jsxs("span", { children: [
								"Напитки (",
								drinkCount,
								")"
							] }), /* @__PURE__ */ jsxs("span", { children: [total, " ₽"] })]
						}), /* @__PURE__ */ jsxs("div", {
							className: "cantata-trow cantata-trow--total",
							children: [/* @__PURE__ */ jsx("span", { children: "Итого" }), /* @__PURE__ */ jsxs("span", { children: [total, " ₽"] })]
						})]
					})
				] })
			}),
			items.length > 0 && /* @__PURE__ */ jsx("div", {
				className: "cantata-ctabar",
				children: /* @__PURE__ */ jsxs(CtaButton, { children: [
					/* @__PURE__ */ jsx(IconCheckout, {}),
					" Оформить заказ · ",
					total,
					" ₽"
				] })
			}),
			/* @__PURE__ */ jsx(BottomNav, {
				activeTab,
				cartCount,
				onTabChange
			})
		]
	});
};
//#endregion
//#region app/cantata_app/data/categories.ts
var categoryGrid = [
	{
		id: "coffee",
		label: "Кофе",
		count: 12,
		icon: "☕"
	},
	{
		id: "tea",
		label: "Чай",
		count: 8,
		icon: "🍵"
	},
	{
		id: "lemonade",
		label: "Лимонады",
		count: 5,
		icon: "🍋"
	},
	{
		id: "signature",
		label: "Авторские",
		count: 10,
		icon: "✨"
	}
];
var catalogTabs = [
	{
		id: "signature",
		label: "Авторское",
		filter: "signature"
	},
	{
		id: "cappuccino",
		label: "Капучино",
		filter: "coffee"
	},
	{
		id: "latte",
		label: "Латте",
		filter: "coffee"
	},
	{
		id: "matcha",
		label: "Матча",
		filter: "signature"
	},
	{
		id: "tea",
		label: "Чай",
		filter: "tea"
	},
	{
		id: "lemonade",
		label: "Лимонады",
		filter: "lemonade"
	}
];
var getCategoryTitle = (category) => {
	return {
		all: "Все",
		coffee: "Кофе",
		tea: "Чай",
		lemonade: "Лимонады",
		signature: "Авторские"
	}[category];
};
//#endregion
//#region app/cantata_app/components/CatalogProductCard.tsx
var CatalogProductCard = ({ drink, onSelect, onQuickAdd }) => /* @__PURE__ */ jsxs("div", {
	className: "cantata-prdcrd",
	children: [/* @__PURE__ */ jsx("div", {
		className: "cantata-prdcrd__pl",
		children: /* @__PURE__ */ jsx("button", {
			type: "button",
			onClick: () => onSelect(drink.id),
			className: "h-full w-full",
			children: drink.image ? /* @__PURE__ */ jsx("img", {
				src: drink.image,
				alt: drink.displayName,
				className: "h-full w-full object-cover"
			}) : /* @__PURE__ */ jsx("div", {
				className: "flex h-full w-full items-center justify-center bg-[var(--bg-cream)] text-3xl opacity-40",
				children: "☕"
			})
		})
	}), /* @__PURE__ */ jsxs("div", {
		className: "cantata-prdcrd__bd",
		children: [/* @__PURE__ */ jsxs("button", {
			type: "button",
			onClick: () => onSelect(drink.id),
			className: "w-full text-left",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "cantata-prdcrd__cat",
					children: drink.category
				}),
				/* @__PURE__ */ jsx("div", {
					className: "cantata-prdcrd__nm",
					children: drink.displayName
				}),
				/* @__PURE__ */ jsx("div", {
					className: "cantata-prdcrd__vol",
					children: getVolumeLabel(drink)
				})
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "cantata-prdcrd__ft",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "cantata-prdcrd__pr",
				children: [
					"от ",
					drink.basePrice,
					" ₽"
				]
			}), /* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: () => onQuickAdd(drink.id),
				className: "cantata-prdcrd__add",
				"aria-label": `Добавить ${drink.displayName}`,
				children: /* @__PURE__ */ jsx(IconPlus$2, {})
			})]
		})]
	})]
});
//#endregion
//#region app/cantata_app/screens/CatalogScreen.tsx
var CatalogScreen = ({ activeTab, cartCount, initialCategory, onTabChange, onSelectDrink, onQuickAdd }) => {
	const [activeTabId, setActiveTabId] = useState(initialCategory ? catalogTabs.find((tab) => tab.filter === initialCategory)?.id ?? "signature" : "signature");
	const activeFilter = catalogTabs.find((tab) => tab.id === activeTabId)?.filter ?? "signature";
	const filteredDrinks = useMemo(() => {
		if (activeFilter === "all") return drinks;
		return drinks.filter((drink) => drink.catalogCategory === activeFilter);
	}, [activeFilter]);
	const title = initialCategory && initialCategory !== "all" ? getCategoryTitle(initialCategory) : activeFilter === "all" ? "Все" : getCategoryTitle(activeFilter);
	return /* @__PURE__ */ jsxs("div", {
		className: "cantata-sc",
		children: [
			/* @__PURE__ */ jsxs("header", {
				className: "cantata-shdr",
				children: [
					/* @__PURE__ */ jsxs("button", {
						type: "button",
						className: "cantata-hbtn cantata-hbtn--pill",
						style: {
							width: "auto",
							padding: "0 12px",
							gap: 5,
							fontSize: 13,
							fontWeight: 600
						},
						"aria-label": "Фильтр",
						children: [/* @__PURE__ */ jsx(IconFilter, { size: 14 }), "Фильтр"]
					}),
					/* @__PURE__ */ jsx("span", {
						className: "cantata-htitle",
						children: title
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						className: "cantata-hbtn",
						"aria-label": "Поиск",
						children: /* @__PURE__ */ jsx(IconSearch$1, {})
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "cantata-scont cantata-hide-scrollbar",
				children: [/* @__PURE__ */ jsx("div", {
					className: "cantata-tabs",
					children: /* @__PURE__ */ jsx("div", {
						className: "cantata-tabsi cantata-hide-scrollbar",
						children: catalogTabs.map((tab) => /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => setActiveTabId(tab.id),
							className: `cantata-tp ${activeTabId === tab.id ? "cantata-tp--a" : ""}`,
							children: tab.label
						}, tab.id))
					})
				}), /* @__PURE__ */ jsx("div", {
					className: "cantata-pgrid",
					children: filteredDrinks.map((drink) => /* @__PURE__ */ jsx(CatalogProductCard, {
						drink,
						onSelect: onSelectDrink,
						onQuickAdd
					}, drink.id))
				})]
			}),
			/* @__PURE__ */ jsx(BottomNav, {
				activeTab,
				cartCount,
				onTabChange
			})
		]
	});
};
//#endregion
//#region app/cantata_app/data/recentOrders.ts
var recentOrders = [
	{
		drinkId: "salted-caramel",
		label: "Капучино «Груша со сливками»",
		priceFrom: 320
	},
	{
		drinkId: "matcha-coconut",
		label: "Матча на кокосовом",
		priceFrom: 380
	},
	{
		drinkId: "cheese-latte",
		label: "Латте «Вишня–Пачули»",
		priceFrom: 350
	}
];
//#endregion
//#region app/cantata_app/components/CategoryCard.tsx
var CategoryCard = ({ category, onSelect }) => /* @__PURE__ */ jsxs("button", {
	type: "button",
	onClick: () => onSelect(category.id),
	className: "cantata-catcard",
	children: [
		category.image && /* @__PURE__ */ jsx("img", {
			src: category.image,
			alt: "",
			className: "cantata-catcard__img"
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "cantata-catcard__content",
			children: [/* @__PURE__ */ jsx("span", {
				className: "text-[22px]",
				style: { color: "var(--cinnamon)" },
				children: category.icon
			}), /* @__PURE__ */ jsx("span", {
				className: "cantata-catcard__label",
				children: category.label
			})]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "cantata-catcard__count",
			children: [category.count, " напитков"]
		})
	]
});
//#endregion
//#region app/cantata_app/components/PromoStrip.tsx
var PromoStrip = ({ variant, icon, title, subtitle, badge }) => /* @__PURE__ */ jsxs("div", {
	className: `cantata-promo-strip cantata-promo-strip--${variant}`,
	children: [
		/* @__PURE__ */ jsx("span", {
			style: { color: variant === "amber" ? "var(--cinnamon)" : "var(--mint)" },
			children: icon
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "cantata-promo-strip__body",
			children: [/* @__PURE__ */ jsx("div", {
				className: "cantata-promo-strip__title",
				children: title
			}), /* @__PURE__ */ jsx("div", {
				className: "cantata-promo-strip__sub",
				children: subtitle
			})]
		}),
		/* @__PURE__ */ jsx("div", {
			className: "cantata-promo-strip__badge",
			children: badge
		})
	]
});
//#endregion
//#region app/cantata_app/components/RecentOrderCard.tsx
var RecentOrderCard = ({ order, onRepeat }) => {
	const drink = getDrinkById(order.drinkId);
	return /* @__PURE__ */ jsxs("div", {
		className: "cantata-rcard",
		children: [/* @__PURE__ */ jsx("div", {
			className: "cantata-rcard__thumb",
			children: drink?.image ? /* @__PURE__ */ jsx("img", {
				src: drink.image,
				alt: order.label
			}) : /* @__PURE__ */ jsx("div", {
				className: "flex h-full w-full items-center justify-center text-2xl",
				children: "☕"
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: "cantata-rcard__body",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
				className: "cantata-rcard__name",
				children: order.label
			}), /* @__PURE__ */ jsxs("div", {
				className: "cantata-rcard__price",
				children: [
					"от ",
					order.priceFrom,
					" ₽"
				]
			})] }), /* @__PURE__ */ jsxs("button", {
				type: "button",
				onClick: () => onRepeat(order.drinkId),
				className: "cantata-rcard__cta",
				children: [/* @__PURE__ */ jsx(IconRepeat, {}), " Повторить"]
			})]
		})]
	});
};
//#endregion
//#region app/cantata_app/screens/HomeScreen.tsx
var heroImage = drinks[0]?.image;
var HomeScreen$2 = ({ activeTab, cartCount, onTabChange, onOpenCatalog, onSelectDrink }) => /* @__PURE__ */ jsxs("div", {
	className: "cantata-sc",
	children: [
		/* @__PURE__ */ jsxs("header", {
			className: "cantata-shdr",
			children: [
				/* @__PURE__ */ jsx("button", {
					type: "button",
					className: "cantata-hbtn",
					"aria-label": "Меню",
					children: /* @__PURE__ */ jsx("span", {
						style: { color: "var(--cinnamon)" },
						children: /* @__PURE__ */ jsx(IconMenu, {})
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "cantata-hloc",
					children: [/* @__PURE__ */ jsx("span", {
						style: { color: "var(--cinnamon)" },
						children: /* @__PURE__ */ jsx(IconPin, {})
					}), "Тульская Б., 13"]
				}),
				/* @__PURE__ */ jsx("button", {
					type: "button",
					className: "cantata-hbtn",
					"aria-label": "Поиск",
					children: /* @__PURE__ */ jsx(IconSearch$1, {})
				})
			]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "cantata-scont cantata-hide-scrollbar",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "cantata-hero-band",
					children: [
						heroImage && /* @__PURE__ */ jsx("img", {
							src: heroImage,
							alt: "",
							className: "cantata-hero-band__img"
						}),
						/* @__PURE__ */ jsx("div", { className: "cantata-hero-band__scrim" }),
						/* @__PURE__ */ jsxs("div", {
							className: "cantata-hero-band__body",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "cantata-hero-band__tag",
									children: "Сезон · 2026"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "cantata-hero-band__title",
									children: [
										"Настроение —",
										/* @__PURE__ */ jsx("br", {}),
										"Солнце!"
									]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "cantata-hero-band__sub",
									children: "5 новых напитков в меню"
								})
							]
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "cantata-sec-row",
					children: [/* @__PURE__ */ jsx("span", {
						className: "cantata-sec-title",
						children: "Недавно заказывали"
					}), /* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => onOpenCatalog(),
						className: "cantata-sec-link",
						children: [/* @__PURE__ */ jsx(IconChevronRight$1, {}), " Все"]
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "cantata-hscroll cantata-hide-scrollbar",
					children: recentOrders.map((order) => /* @__PURE__ */ jsx(RecentOrderCard, {
						order,
						onRepeat: onSelectDrink
					}, order.drinkId))
				}),
				/* @__PURE__ */ jsx(PromoStrip, {
					variant: "amber",
					icon: /* @__PURE__ */ jsx(IconTag, {}),
					title: "Второй напиток −20%",
					subtitle: "При заказе двух напитков",
					badge: "−20%"
				}),
				/* @__PURE__ */ jsx(PromoStrip, {
					variant: "mint",
					icon: /* @__PURE__ */ jsx(IconGift, {}),
					title: "Сироп в подарок",
					subtitle: "К любому кофейному напитку",
					badge: "Бесплатно"
				}),
				/* @__PURE__ */ jsx("div", {
					className: "cantata-sec-row",
					style: { marginTop: 20 },
					children: /* @__PURE__ */ jsx("span", {
						className: "cantata-sec-title",
						children: "Каталог"
					})
				}),
				/* @__PURE__ */ jsx("div", {
					className: "cantata-catgrid",
					children: categoryGrid.map((category) => /* @__PURE__ */ jsx(CategoryCard, {
						category,
						onSelect: onOpenCatalog
					}, category.id))
				})
			]
		}),
		/* @__PURE__ */ jsx(BottomNav, {
			activeTab,
			cartCount,
			onTabChange
		})
	]
});
//#endregion
//#region app/cantata_app/components/IngredientRow.tsx
var IngredientRow = ({ addon, selected, onToggle }) => /* @__PURE__ */ jsxs("button", {
	type: "button",
	onClick: () => onToggle(addon.id),
	className: "cantata-ingrow w-full text-left",
	children: [
		/* @__PURE__ */ jsx("span", {
			className: "cantata-ingrow__nm",
			children: addon.name
		}),
		addon.price === 0 ? /* @__PURE__ */ jsx("span", {
			className: "cantata-ingrow__free",
			children: "Бесплатно"
		}) : /* @__PURE__ */ jsxs("span", {
			className: "cantata-ingrow__price",
			children: [
				"+",
				addon.price,
				" ₽"
			]
		}),
		/* @__PURE__ */ jsx("span", {
			className: `flex h-[25px] w-[25px] items-center justify-center rounded-[7px] border text-xs ${selected ? "border-[var(--cinnamon)] bg-[var(--cinnamon)] text-white" : "border-[var(--line-md)] bg-[var(--bg-cream)] text-[var(--text-sub)]"}`,
			children: selected ? "✓" : "+"
		})
	]
});
//#endregion
//#region app/cantata_app/components/ProductHeroStories.tsx
var DEFAULT_IMAGE_DURATION = 5e3;
var ProductHeroStories = ({ media, alt, paused = false, drink }) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [progress, setProgress] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const videoRef = useRef(null);
	const rafRef = useRef(0);
	const startTimeRef = useRef(0);
	const pointerStartRef = useRef({
		time: 0,
		x: 0
	});
	const current = media[activeIndex];
	const isVideo = current?.type === "video";
	const duration = current?.duration ?? DEFAULT_IMAGE_DURATION;
	const isHoldPaused = paused || isPaused;
	const goNext = useCallback(() => {
		setActiveIndex((index) => (index + 1) % media.length);
		setProgress(0);
	}, [media.length]);
	const goPrev = useCallback(() => {
		setActiveIndex((index) => (index - 1 + media.length) % media.length);
		setProgress(0);
	}, [media.length]);
	useEffect(() => {
		setActiveIndex(0);
		setProgress(0);
	}, [media]);
	useEffect(() => {
		if (isHoldPaused || isVideo || media.length <= 1) return;
		startTimeRef.current = performance.now();
		const tick = (now) => {
			const elapsed = now - startTimeRef.current;
			const nextProgress = Math.min(elapsed / duration, 1);
			setProgress(nextProgress);
			if (nextProgress >= 1) {
				goNext();
				return;
			}
			rafRef.current = requestAnimationFrame(tick);
		};
		rafRef.current = requestAnimationFrame(tick);
		return () => {
			cancelAnimationFrame(rafRef.current);
		};
	}, [
		activeIndex,
		duration,
		goNext,
		isHoldPaused,
		isVideo,
		media.length
	]);
	useEffect(() => {
		const video = videoRef.current;
		if (!video || !isVideo) return;
		video.currentTime = 0;
		const handleTimeUpdate = () => {
			if (!video.duration) return;
			setProgress(video.currentTime / video.duration);
		};
		const handleEnded = () => {
			goNext();
		};
		video.addEventListener("timeupdate", handleTimeUpdate);
		video.addEventListener("ended", handleEnded);
		if (!isHoldPaused) video.play().catch(() => {});
		return () => {
			video.removeEventListener("timeupdate", handleTimeUpdate);
			video.removeEventListener("ended", handleEnded);
		};
	}, [
		activeIndex,
		goNext,
		isHoldPaused,
		isVideo
	]);
	useEffect(() => {
		const video = videoRef.current;
		if (!video || !isVideo) return;
		if (isHoldPaused) {
			video.pause();
			return;
		}
		video.play().catch(() => {});
	}, [isHoldPaused, isVideo]);
	const handleTap = (event) => {
		if (media.length <= 1) return;
		if (performance.now() - pointerStartRef.current.time > 250) return;
		const rect = event.currentTarget.getBoundingClientRect();
		if (event.clientX - rect.left < rect.width * .35) {
			goPrev();
			return;
		}
		goNext();
	};
	const handleHoldStart = (event) => {
		pointerStartRef.current = {
			time: performance.now(),
			x: event.clientX
		};
		setIsPaused(true);
	};
	const handleHoldEnd = () => {
		setIsPaused(false);
	};
	if (!current) return null;
	return /* @__PURE__ */ jsxs("div", {
		className: "cantata-hero-stories absolute inset-0",
		children: [
			media.length > 1 && /* @__PURE__ */ jsx("div", {
				className: "absolute inset-x-3 top-3 z-20 flex gap-1",
				children: media.map((item, index) => /* @__PURE__ */ jsx("div", {
					className: "h-[2px] flex-1 overflow-hidden rounded-full bg-white/30",
					children: /* @__PURE__ */ jsx("div", {
						className: "cantata-story-progress h-full rounded-full bg-white",
						style: { width: index < activeIndex ? "100%" : index === activeIndex ? `${progress * 100}%` : "0%" }
					})
				}, `${item.src}-${index}`))
			}),
			/* @__PURE__ */ jsx("div", {
				className: "absolute inset-0",
				children: isVideo ? /* @__PURE__ */ jsx("video", {
					ref: videoRef,
					src: current.src,
					className: "cantata-product-hero-img",
					playsInline: true,
					muted: true,
					loop: media.length === 1
				}) : /* @__PURE__ */ jsx("img", {
					src: current.src,
					alt,
					className: "cantata-product-hero-img"
				})
			}),
			media.length > 1 && /* @__PURE__ */ jsx("div", {
				className: "absolute inset-0 z-10 touch-none",
				onPointerDown: handleHoldStart,
				onPointerUp: (event) => {
					handleHoldEnd();
					handleTap(event);
				},
				onPointerCancel: handleHoldEnd,
				onPointerLeave: handleHoldEnd
			})
		]
	});
};
//#endregion
//#region app/cantata_app/components/VolumeChip.tsx
var VolumeChip = ({ volume, price, selected, onSelect }) => /* @__PURE__ */ jsxs("button", {
	type: "button",
	onClick: () => onSelect(volume),
	className: `cantata-vchip ${selected ? "cantata-vchip--on" : ""}`,
	children: [/* @__PURE__ */ jsxs("span", { children: [volume, " мл"] }), /* @__PURE__ */ jsxs("span", {
		className: "cantata-vchip__ml",
		children: [price, " ₽"]
	})]
});
//#endregion
//#region app/cantata_app/screens/ProductScreen.tsx
var VOLUME_OPTIONS = [
	300,
	400,
	500
];
var buildSizeOptions = (drink) => VOLUME_OPTIONS.map((volume) => {
	const existing = drink.sizes.find((size) => size.volume === volume);
	if (existing) return existing;
	const base = drink.sizes[0];
	const ratio = volume / base.volume;
	return {
		volume,
		calories: Math.round(base.calories * ratio)
	};
});
var ProductScreen = ({ drink, mode, onBack, onOrder, onAddToCart }) => {
	const sizeOptions = useMemo(() => buildSizeOptions(drink), [drink]);
	const heroMedia = useMemo(() => getDrinkMedia(drink), [drink]);
	const [selectedVolume, setSelectedVolume] = useState(() => drink.sizes[0]?.volume ?? 300);
	const [selectedAddonIds, setSelectedAddonIds] = useState([]);
	const addonsTotal = useMemo(() => addons.filter((addon) => selectedAddonIds.includes(addon.id)).reduce((sum, addon) => sum + addon.price, 0), [selectedAddonIds]);
	const displayPrice = getVolumePrice(drink, selectedVolume) + (mode === "addons" ? addonsTotal : 0);
	const handlePrimaryAction = () => {
		if (mode === "addons") {
			onAddToCart(drink.id, selectedVolume, selectedAddonIds);
			return;
		}
		onOrder();
	};
	const handleToggleAddon = (id) => {
		setSelectedAddonIds((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "cantata-product-screen",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "cantata-product-hero cantata-hero-shimmer",
				children: [heroMedia.length > 0 ? /* @__PURE__ */ jsx(ProductHeroStories, {
					media: heroMedia,
					alt: drink.name,
					drink
				}) : /* @__PURE__ */ jsx("div", {
					className: "absolute inset-0",
					style: { background: `linear-gradient(160deg, ${drink.pastelAccent} 0%, #F8F4EB 40%, #EAF0F9 100%)` }
				}), /* @__PURE__ */ jsx("div", { className: "cantata-phero__fade" })]
			}),
			/* @__PURE__ */ jsxs("header", {
				className: "cantata-shdr cantata-shdr--float",
				children: [
					/* @__PURE__ */ jsx(BackButton$1, {
						onClick: onBack,
						variant: "ghost"
					}),
					/* @__PURE__ */ jsx("div", { className: "w-[38px]" }),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						className: "cantata-hbtn cantata-hbtn--ghost",
						"aria-label": "В избранное",
						children: /* @__PURE__ */ jsx(IconHeart, {})
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "cantata-product-footer",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "cantata-product-hero-caption",
					children: [/* @__PURE__ */ jsx("p", {
						className: "cantata-product-hero-caption__category",
						children: mode === "addons" ? "Дополнительно" : drink.category
					}), /* @__PURE__ */ jsx("h1", {
						className: "cantata-product-hero-caption__title",
						children: drink.displayName
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "cantata-product-bottom-sheet",
					children: mode === "detail" ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", {
						className: "cantata-product-bottom-sheet__volumes",
						children: sizeOptions.map((size) => /* @__PURE__ */ jsx(VolumeChip, {
							volume: size.volume,
							price: getVolumePrice(drink, size.volume),
							selected: selectedVolume === size.volume,
							onSelect: setSelectedVolume
						}, size.volume))
					}), /* @__PURE__ */ jsxs(CtaButton, {
						onClick: handlePrimaryAction,
						children: [
							/* @__PURE__ */ jsx(IconCartAdd, {}),
							"Заказать · ",
							displayPrice,
							" ₽"
						]
					})] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", {
						className: "cantata-product-bottom-sheet__addons cantata-hide-scrollbar",
						children: addons.map((addon) => /* @__PURE__ */ jsx(IngredientRow, {
							addon,
							selected: selectedAddonIds.includes(addon.id),
							onToggle: handleToggleAddon
						}, addon.id))
					}), /* @__PURE__ */ jsxs(CtaButton, {
						onClick: handlePrimaryAction,
						children: [
							/* @__PURE__ */ jsx(IconCartAdd, {}),
							"В корзину · ",
							displayPrice,
							" ₽"
						]
					})] })
				})]
			})
		]
	});
};
//#endregion
//#region app/cantata_app/frame.tsx
var createCartItemId = () => `cart-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
var CantataFrame = () => {
	const [screen, setScreen] = useState("home");
	const [activeTab, setActiveTab] = useState("home");
	const [selectedDrinkId, setSelectedDrinkId] = useState(null);
	const [productMode, setProductMode] = useState("detail");
	const [catalogFilter, setCatalogFilter] = useState();
	const [cart, setCart] = useState([]);
	const [productOrigin, setProductOrigin] = useState("catalog");
	const [screenKey, setScreenKey] = useState(0);
	const selectedDrink = selectedDrinkId ? getDrinkById(selectedDrinkId) : null;
	const cartCount = getCartCount(cart);
	const addToCart = useCallback((drinkId, volume, addonIds = []) => {
		const drink = getDrinkById(drinkId);
		if (!drink) return;
		const resolvedVolume = volume ?? drink.sizes[0]?.volume ?? 300;
		const addonsTotal = addons.filter((addon) => addonIds.includes(addon.id)).reduce((sum, addon) => sum + addon.price, 0);
		const unitPrice = getVolumePrice(drink, resolvedVolume) + addonsTotal;
		const key = getCartItemKey(drinkId, resolvedVolume, addonIds);
		setCart((prev) => {
			const existing = prev.find((item) => getCartItemKey(item.drinkId, item.volume, item.addonIds) === key);
			if (existing) return prev.map((item) => item.id === existing.id ? {
				...item,
				quantity: item.quantity + 1
			} : item);
			return [...prev, {
				id: createCartItemId(),
				drinkId,
				volume: resolvedVolume,
				addonIds,
				quantity: 1,
				unitPrice
			}];
		});
	}, []);
	const handleTabChange = (tab) => {
		if (tab === "stores" || tab === "profile") return;
		setActiveTab(tab);
		setScreen(tab);
		setScreenKey((prev) => prev + 1);
	};
	const handleOpenCatalog = (category) => {
		setCatalogFilter(category);
		setActiveTab("catalog");
		setScreen("catalog");
		setScreenKey((prev) => prev + 1);
	};
	const handleSelectDrink = (id, origin = screen) => {
		setSelectedDrinkId(id);
		setProductMode("detail");
		setProductOrigin(origin === "product" ? "catalog" : origin);
		setScreen("product");
	};
	const handleQuickAdd = (id) => {
		addToCart(id);
		setActiveTab("cart");
		setScreen("cart");
	};
	const handleBackFromProduct = () => {
		if (productMode === "addons") {
			setProductMode("detail");
			return;
		}
		setScreen(productOrigin);
		setActiveTab(productOrigin === "cart" ? "cart" : productOrigin === "home" ? "home" : "catalog");
		setSelectedDrinkId(null);
		setProductMode("detail");
		setScreenKey((prev) => prev + 1);
	};
	const handleOrder = () => {
		setProductMode("addons");
	};
	const handleAddToCartFromProduct = (drinkId, volume, addonIds) => {
		addToCart(drinkId, volume, addonIds);
		setSelectedDrinkId(null);
		setProductMode("detail");
		setActiveTab("cart");
		setScreen("cart");
		setScreenKey((prev) => prev + 1);
	};
	const handleUpdateQuantity = (id, quantity) => {
		if (quantity <= 0) {
			setCart((prev) => prev.filter((item) => item.id !== id));
			return;
		}
		setCart((prev) => prev.map((item) => item.id === id ? {
			...item,
			quantity
		} : item));
	};
	const handleRemoveItem = (id) => {
		setCart((prev) => prev.filter((item) => item.id !== id));
	};
	const handleCartBack = () => {
		setActiveTab("home");
		setScreen("home");
		setScreenKey((prev) => prev + 1);
	};
	return /* @__PURE__ */ jsxs("div", {
		className: `cantata-root relative h-full ${screen === "product" ? "overflow-hidden" : ""}`,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "cantata-screen-enter h-full",
			children: [
				screen === "home" && /* @__PURE__ */ jsx(HomeScreen$2, {
					activeTab,
					cartCount,
					onTabChange: handleTabChange,
					onOpenCatalog: handleOpenCatalog,
					onSelectDrink: (id) => handleSelectDrink(id, "home")
				}),
				screen === "catalog" && /* @__PURE__ */ jsx(CatalogScreen, {
					activeTab,
					cartCount,
					initialCategory: catalogFilter,
					onTabChange: handleTabChange,
					onSelectDrink: (id) => handleSelectDrink(id, "catalog"),
					onQuickAdd: handleQuickAdd
				}),
				screen === "cart" && /* @__PURE__ */ jsx(CartScreen, {
					activeTab,
					cartCount,
					items: cart,
					onTabChange: handleTabChange,
					onBack: handleCartBack,
					onOpenCatalog: () => handleOpenCatalog(),
					onUpdateQuantity: handleUpdateQuantity,
					onRemoveItem: handleRemoveItem
				})
			]
		}, screenKey), screen === "product" && selectedDrink && /* @__PURE__ */ jsx("div", {
			className: "absolute inset-0 z-50 h-full overflow-hidden",
			children: /* @__PURE__ */ jsx(ProductScreen, {
				drink: selectedDrink,
				mode: productMode,
				onBack: handleBackFromProduct,
				onOrder: handleOrder,
				onAddToCart: handleAddToCartFromProduct
			})
		})]
	});
};
//#endregion
//#region app/components/phone-frame.tsx
var PhoneFrame = ({ children, label }) => /* @__PURE__ */ jsxs("div", {
	className: "flex flex-col items-center gap-3",
	children: [/* @__PURE__ */ jsx("div", {
		className: "overflow-hidden rounded-[2.5rem] border-[6px] border-gray-900 bg-gray-900 shadow-2xl dark:border-gray-700",
		children: /* @__PURE__ */ jsx("div", {
			className: "h-[844px] w-[390px] overflow-hidden bg-white",
			children
		})
	}), label && /* @__PURE__ */ jsx("span", {
		className: "text-sm font-medium text-gray-500 dark:text-gray-400",
		children: label
	})]
});
//#endregion
//#region app/coach_app/components/BottomTabBar.tsx
var tabs$1 = [
	{
		id: "home",
		label: "Главная"
	},
	{
		id: "course",
		label: "Курс"
	},
	{
		id: "profile",
		label: "Профиль"
	}
];
var IconHome = () => /* @__PURE__ */ jsx("svg", {
	width: "22",
	height: "22",
	viewBox: "0 0 22 22",
	fill: "none",
	"aria-hidden": "true",
	children: /* @__PURE__ */ jsx("path", {
		d: "M4 9.5L11 3.5L18 9.5V17.5C18 18.05 17.55 18.5 17 18.5H14.5V13.5H7.5V18.5H5C4.45 18.5 4 18.05 4 17.5V9.5Z",
		stroke: "currentColor",
		strokeWidth: "1.4",
		strokeLinejoin: "round"
	})
});
var IconCourse = () => /* @__PURE__ */ jsxs("svg", {
	width: "22",
	height: "22",
	viewBox: "0 0 22 22",
	fill: "none",
	"aria-hidden": "true",
	children: [
		/* @__PURE__ */ jsx("rect", {
			x: "4",
			y: "4",
			width: "6",
			height: "6",
			rx: "1.5",
			stroke: "currentColor",
			strokeWidth: "1.4"
		}),
		/* @__PURE__ */ jsx("rect", {
			x: "12",
			y: "4",
			width: "6",
			height: "6",
			rx: "1.5",
			stroke: "currentColor",
			strokeWidth: "1.4"
		}),
		/* @__PURE__ */ jsx("rect", {
			x: "4",
			y: "12",
			width: "6",
			height: "6",
			rx: "1.5",
			stroke: "currentColor",
			strokeWidth: "1.4"
		}),
		/* @__PURE__ */ jsx("path", {
			d: "M15 14.5H18.5M17 13V16",
			stroke: "currentColor",
			strokeWidth: "1.4",
			strokeLinecap: "round"
		})
	]
});
var IconProfile = () => /* @__PURE__ */ jsxs("svg", {
	width: "22",
	height: "22",
	viewBox: "0 0 22 22",
	fill: "none",
	"aria-hidden": "true",
	children: [/* @__PURE__ */ jsx("circle", {
		cx: "11",
		cy: "8",
		r: "3",
		stroke: "currentColor",
		strokeWidth: "1.4"
	}), /* @__PURE__ */ jsx("path", {
		d: "M5 18.5C5 15.5 7.7 13.5 11 13.5C14.3 13.5 17 15.5 17 18.5",
		stroke: "currentColor",
		strokeWidth: "1.4",
		strokeLinecap: "round"
	})]
});
var icons$1 = {
	home: IconHome,
	course: IconCourse,
	profile: IconProfile
};
var BottomTabBar = ({ activeTab }) => /* @__PURE__ */ jsx("nav", {
	className: "coach-tab-bar",
	"aria-label": "Основная навигация",
	children: tabs$1.map(({ id, label }) => {
		const Icon = icons$1[id];
		const isActive = activeTab === id;
		return /* @__PURE__ */ jsxs("div", {
			className: `coach-tab-bar__item ${isActive ? "coach-tab-bar__item--active" : ""}`,
			"aria-current": isActive ? "page" : void 0,
			children: [/* @__PURE__ */ jsx("span", {
				className: "coach-tab-bar__icon",
				children: /* @__PURE__ */ jsx(Icon, {})
			}), /* @__PURE__ */ jsx("span", { children: label })]
		}, id);
	})
});
//#endregion
//#region app/coach_app/components/LessonProgressBar.tsx
var LessonProgressBar = ({ progress, className = "" }) => /* @__PURE__ */ jsx("div", {
	className: `coach-progress-bar ${className}`,
	children: /* @__PURE__ */ jsx("div", {
		className: "coach-progress-bar__fill",
		style: { width: `${progress}%` }
	})
});
//#endregion
//#region app/coach_app/components/CourseHeader.tsx
var CourseHeader = ({ course }) => /* @__PURE__ */ jsxs("div", {
	className: "mb-4",
	children: [/* @__PURE__ */ jsxs("div", {
		className: "mb-3 flex items-center justify-between text-[12px] coach-text-muted",
		children: [/* @__PURE__ */ jsxs("span", { children: [course.progress, "% пройдено"] }), /* @__PURE__ */ jsxs("span", { children: [
			course.lessonCount,
			" уроков · ",
			course.totalHours,
			" ч"
		] })]
	}), /* @__PURE__ */ jsx(LessonProgressBar, { progress: course.progress })]
});
//#endregion
//#region app/coach_app/data/images.ts
var img = (id, width = 800) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;
var coachImages = {
	fallback: "https://avatars.mds.yandex.net/i?id=6a6d63ce5147d7f67c4eacd47d6b6ae4_l-5228110-images-thumbs&n=13",
	avatar: img("1500648767791-00dcc994a43e", 400),
	courseHero: img("1455390582262-044cdead277a", 900),
	currentLesson: img("1517971071642-34a2d3ecc9cd", 900),
	challenge: img("1491841550275-ad7854e35ca6", 600),
	lessonDemo: img("1517971129774-8a2b38fa128e", 900),
	practice: img("1517842645767-c639042777db", 900),
	aiReviewUpload: img("1455390582262-044cdead277a", 900),
	gallery: {
		letterA: img("1517971129774-8a2b38fa128e", 400),
		letterB: img("1517971071642-34a2d3ecc9cd", 400),
		hello: img("1455390582262-044cdead277a", 400)
	},
	lessons: {
		intro: img("1491841550275-ad7854e35ca6", 400),
		"letter-a": img("1517971129774-8a2b38fa128e", 400),
		"letter-b": img("1517971071642-34a2d3ecc9cd", 400),
		"letter-c": img("1455390582262-044cdead277a", 400),
		"letter-d": img("1517842645767-c639042777db", 400),
		"letter-e": img("1491841550275-ad7854e35ca6", 400),
		"letter-f": img("1517971129774-8a2b38fa128e", 400),
		"word-hello": img("1517971071642-34a2d3ecc9cd", 400)
	},
	buildSteps: [
		img("1455390582262-044cdead277a", 300),
		img("1517971129774-8a2b38fa128e", 300),
		img("1517842645767-c639042777db", 300)
	],
	mistakes: [
		{
			src: img("1491841550275-ad7854e35ca6", 300),
			position: "35% 45%"
		},
		{
			src: img("1517971071642-34a2d3ecc9cd", 300),
			position: "55% 50%"
		},
		{
			src: img("1517971129774-8a2b38fa128e", 300),
			position: "center"
		}
	]
};
var getLessonImage = (lessonId) => coachImages.lessons[lessonId] ?? coachImages.fallback;
//#endregion
//#region app/coach_app/components/CoachImage.tsx
var CoachImage = ({ src = coachImages.fallback, alt, className = "", rounded = "rounded-xl", objectPosition = "center" }) => /* @__PURE__ */ jsx("img", {
	src,
	alt,
	className: `coach-img-cover coach-img-muted ${rounded} ${className}`,
	style: { objectPosition }
});
//#endregion
//#region app/coach_app/components/LessonRoadmapCard.tsx
var statusIcon = (status) => {
	if (status === "completed") return /* @__PURE__ */ jsx("div", {
		className: "flex h-6 w-6 items-center justify-center rounded-full border border-[rgba(0,0,0,0.12)] coach-text",
		children: /* @__PURE__ */ jsx("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 12 12",
			fill: "none",
			"aria-hidden": "true",
			children: /* @__PURE__ */ jsx("path", {
				d: "M2.5 6L5 8.5L9.5 4",
				stroke: "currentColor",
				strokeWidth: "1.3",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			})
		})
	});
	if (status === "current") return /* @__PURE__ */ jsx("div", {
		className: "flex h-6 w-6 items-center justify-center rounded-full bg-[#1C1C1E]",
		children: /* @__PURE__ */ jsx("svg", {
			width: "8",
			height: "8",
			viewBox: "0 0 8 8",
			fill: "white",
			"aria-hidden": "true",
			children: /* @__PURE__ */ jsx("path", { d: "M1.5 1L7 4L1.5 7V1Z" })
		})
	});
	return /* @__PURE__ */ jsx("div", {
		className: "flex h-6 w-6 items-center justify-center rounded-full border border-[rgba(0,0,0,0.08)] coach-text-faint",
		children: /* @__PURE__ */ jsxs("svg", {
			width: "10",
			height: "10",
			viewBox: "0 0 10 10",
			fill: "none",
			"aria-hidden": "true",
			children: [/* @__PURE__ */ jsx("rect", {
				x: "2.5",
				y: "4.5",
				width: "5",
				height: "4",
				rx: "0.5",
				stroke: "currentColor",
				strokeWidth: "1"
			}), /* @__PURE__ */ jsx("path", {
				d: "M3.5 4.5V3.5C3.5 2.7 4.2 2 5 2C5.8 2 6.5 2.7 6.5 3.5V4.5",
				stroke: "currentColor",
				strokeWidth: "1"
			})]
		})
	});
};
var LessonRoadmapCard = ({ lesson }) => {
	const isLocked = lesson.status === "locked";
	return /* @__PURE__ */ jsxs("div", {
		className: `coach-glass-card p-3 ${isLocked ? "opacity-45" : ""}`,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-3",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "h-11 w-11 shrink-0 overflow-hidden rounded-lg",
					children: /* @__PURE__ */ jsx(CoachImage, {
						src: lesson.image,
						alt: lesson.title,
						rounded: "rounded-lg"
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2",
						children: [statusIcon(lesson.status), /* @__PURE__ */ jsx("p", {
							className: "truncate text-[14px] font-medium coach-text",
							children: lesson.title
						})]
					}), !isLocked && /* @__PURE__ */ jsxs("p", {
						className: "mt-0.5 text-[11px] coach-text-muted",
						children: [lesson.progress, "%"]
					})]
				}),
				isLocked && /* @__PURE__ */ jsx("span", {
					className: "text-[10px] uppercase tracking-[0.1em] coach-text-faint",
					children: "Скоро"
				})
			]
		}), !isLocked && /* @__PURE__ */ jsx("div", {
			className: "mt-3",
			children: /* @__PURE__ */ jsx(LessonProgressBar, { progress: lesson.progress })
		})]
	});
};
//#endregion
//#region app/coach_app/components/ScreenShell.tsx
var ScreenShell$2 = ({ children, footer }) => /* @__PURE__ */ jsxs("div", {
	className: "coach-screen coach-screen-enter h-[844px] overflow-hidden",
	children: [/* @__PURE__ */ jsx("div", {
		className: "coach-screen__glow",
		"aria-hidden": "true"
	}), /* @__PURE__ */ jsxs("div", {
		className: `coach-screen__content relative z-10 flex h-full flex-col ${footer ? "" : ""}`,
		children: [/* @__PURE__ */ jsx("div", {
			className: `coach-hide-scrollbar flex-1 px-5 ${footer ? "overflow-y-auto" : "overflow-y-auto"}`,
			children
		}), footer]
	})]
});
//#endregion
//#region app/coach_app/components/StatusBar.tsx
var StatusBar$2 = ({ light = false }) => /* @__PURE__ */ jsxs("div", {
	className: `flex h-11 items-end justify-between px-5 pb-1 pt-2 ${light ? "text-white" : "coach-text"}`,
	children: [/* @__PURE__ */ jsx("span", {
		className: "text-[13px] font-semibold",
		children: "9:41"
	}), /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-1",
		children: [
			/* @__PURE__ */ jsxs("svg", {
				width: "16",
				height: "12",
				viewBox: "0 0 16 12",
				fill: "none",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ jsx("rect", {
						x: "0",
						y: "6",
						width: "3",
						height: "6",
						rx: "0.5",
						fill: "currentColor"
					}),
					/* @__PURE__ */ jsx("rect", {
						x: "4.5",
						y: "4",
						width: "3",
						height: "8",
						rx: "0.5",
						fill: "currentColor"
					}),
					/* @__PURE__ */ jsx("rect", {
						x: "9",
						y: "2",
						width: "3",
						height: "10",
						rx: "0.5",
						fill: "currentColor"
					}),
					/* @__PURE__ */ jsx("rect", {
						x: "13.5",
						y: "0",
						width: "2.5",
						height: "12",
						rx: "0.5",
						fill: "currentColor"
					})
				]
			}),
			/* @__PURE__ */ jsxs("svg", {
				width: "15",
				height: "12",
				viewBox: "0 0 15 12",
				fill: "none",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ jsx("path", {
						d: "M7.5 2.5C9.8 2.5 11.9 3.4 13.4 5L14.8 3.6C12.9 1.4 10.3 0 7.5 0C4.7 0 2.1 1.4 0.2 3.6L1.6 5C3.1 3.4 5.2 2.5 7.5 2.5Z",
						fill: "currentColor"
					}),
					/* @__PURE__ */ jsx("path", {
						d: "M7.5 6.5C8.9 6.5 10.2 7 11.2 8L12.6 6.6C11.2 5.2 9.4 4.5 7.5 4.5C5.6 4.5 3.8 5.2 2.4 6.6L3.8 8C4.8 7 6.1 6.5 7.5 6.5Z",
						fill: "currentColor"
					}),
					/* @__PURE__ */ jsx("circle", {
						cx: "7.5",
						cy: "10.5",
						r: "1.5",
						fill: "currentColor"
					})
				]
			}),
			/* @__PURE__ */ jsxs("svg", {
				width: "25",
				height: "12",
				viewBox: "0 0 25 12",
				fill: "none",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ jsx("rect", {
						x: "0.5",
						y: "0.5",
						width: "21",
						height: "11",
						rx: "2.5",
						stroke: "currentColor",
						strokeOpacity: "0.35"
					}),
					/* @__PURE__ */ jsx("rect", {
						x: "2",
						y: "2",
						width: "16",
						height: "8",
						rx: "1.5",
						fill: "currentColor"
					}),
					/* @__PURE__ */ jsx("path", {
						d: "M23 4.5V7.5C23.8 7.2 24.5 6.5 24.5 6C24.5 5.5 23.8 4.8 23 4.5Z",
						fill: "currentColor",
						fillOpacity: "0.4"
					})
				]
			})
		]
	})]
});
//#endregion
//#region app/coach_app/data/course.ts
var calligraphyBasics = {
	id: "calligraphy-basics",
	title: "Основы каллиграфии",
	progress: 21,
	lessonCount: 8,
	totalHours: 3,
	coverImage: coachImages.courseHero,
	lessons: [
		{
			id: "intro",
			title: "Инструменты и посадка",
			status: "completed",
			progress: 100,
			image: getLessonImage("intro")
		},
		{
			id: "letter-a",
			title: "Большая буква А",
			status: "current",
			progress: 70,
			image: getLessonImage("letter-a")
		},
		{
			id: "letter-b",
			title: "Большая буква Б",
			status: "locked",
			progress: 0,
			image: getLessonImage("letter-b")
		},
		{
			id: "letter-c",
			title: "Большая буква В",
			status: "locked",
			progress: 0,
			image: getLessonImage("letter-c")
		},
		{
			id: "letter-d",
			title: "Большая буква Г",
			status: "locked",
			progress: 0,
			image: getLessonImage("letter-d")
		},
		{
			id: "letter-e",
			title: "Связки А-Л-М",
			status: "locked",
			progress: 0,
			image: getLessonImage("letter-e")
		},
		{
			id: "letter-f",
			title: "Ритм строки",
			status: "locked",
			progress: 0,
			image: getLessonImage("letter-f")
		},
		{
			id: "word-hello",
			title: "Слово: МИР",
			status: "locked",
			progress: 0,
			image: getLessonImage("word-hello")
		}
	]
};
//#endregion
//#region app/coach_app/screens/CourseScreen.tsx
var CourseScreen = () => /* @__PURE__ */ jsxs(ScreenShell$2, {
	footer: /* @__PURE__ */ jsx(BottomTabBar, { activeTab: "course" }),
	children: [
		/* @__PURE__ */ jsx(StatusBar$2, {}),
		/* @__PURE__ */ jsxs("header", {
			className: "mb-4 flex items-center gap-3 pt-1",
			children: [/* @__PURE__ */ jsx("button", {
				type: "button",
				className: "coach-icon-btn h-9 w-9 shrink-0 coach-text",
				"aria-label": "Назад",
				children: /* @__PURE__ */ jsx("svg", {
					width: "14",
					height: "14",
					viewBox: "0 0 14 14",
					fill: "none",
					"aria-hidden": "true",
					children: /* @__PURE__ */ jsx("path", {
						d: "M9 2.5L4.5 7L9 11.5",
						stroke: "currentColor",
						strokeWidth: "1.4",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				})
			}), /* @__PURE__ */ jsx("h1", {
				className: "text-[20px] font-semibold tracking-[-0.02em] coach-text",
				children: calligraphyBasics.title
			})]
		}),
		/* @__PURE__ */ jsx("div", {
			className: "mb-4 h-[120px] overflow-hidden rounded-2xl border border-[rgba(0,0,0,0.06)]",
			children: /* @__PURE__ */ jsx(CoachImage, {
				src: calligraphyBasics.coverImage,
				alt: calligraphyBasics.title,
				rounded: "rounded-2xl"
			})
		}),
		/* @__PURE__ */ jsx(CourseHeader, { course: calligraphyBasics }),
		/* @__PURE__ */ jsx("div", {
			className: "flex flex-col gap-2 pb-4",
			children: calligraphyBasics.lessons.map((lesson) => /* @__PURE__ */ jsx(LessonRoadmapCard, { lesson }, lesson.id))
		})
	]
});
//#endregion
//#region app/coach_app/components/FormQuizBlock.tsx
var FormQuizBlock = ({ quiz }) => /* @__PURE__ */ jsxs("div", {
	className: "coach-glass-card p-4",
	children: [/* @__PURE__ */ jsx("p", {
		className: "text-[14px] font-medium coach-text",
		children: quiz.question
	}), /* @__PURE__ */ jsx("div", {
		className: "coach-quiz-options mt-3",
		children: quiz.options.map((option) => /* @__PURE__ */ jsxs("div", {
			className: "coach-quiz-options__item",
			children: [/* @__PURE__ */ jsx("div", {
				className: "coach-quiz-options__thumb",
				children: /* @__PURE__ */ jsx(CoachImage, {
					src: option.image,
					alt: option.label,
					rounded: "rounded-md"
				})
			}), /* @__PURE__ */ jsx("span", {
				className: "coach-quiz-options__label",
				children: option.label
			})]
		}, option.id))
	})]
});
//#endregion
//#region app/coach_app/components/LessonHeader.tsx
var LessonHeader = ({ title, badge, stepLabel, progress }) => /* @__PURE__ */ jsxs("header", {
	className: "mb-4 pt-1",
	children: [
		/* @__PURE__ */ jsxs("div", {
			className: "mb-2 flex items-center justify-between",
			children: [/* @__PURE__ */ jsx("span", {
				className: "rounded-full border border-[rgba(0,0,0,0.08)] bg-white/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] coach-text-muted",
				children: badge
			}), stepLabel && /* @__PURE__ */ jsx("span", {
				className: "text-[12px] coach-text-muted",
				children: stepLabel
			})]
		}),
		/* @__PURE__ */ jsx("h1", {
			className: "text-[20px] font-semibold tracking-[-0.02em] coach-text",
			children: title
		}),
		/* @__PURE__ */ jsx("div", {
			className: "mt-3",
			children: /* @__PURE__ */ jsx("div", {
				className: "coach-progress-bar",
				children: /* @__PURE__ */ jsx("div", {
					className: "coach-progress-bar__fill",
					style: { width: `${progress}%` }
				})
			})
		})
	]
});
//#endregion
//#region app/coach_app/components/LessonSubnav.tsx
var items = [
	{
		id: "theory",
		label: "Теория"
	},
	{
		id: "exercise",
		label: "Практика"
	},
	{
		id: "chat",
		label: "AI-чат"
	}
];
var LessonSubnav = ({ active }) => /* @__PURE__ */ jsx("div", {
	className: "mt-4 flex gap-1 rounded-xl border border-[rgba(0,0,0,0.06)] bg-white/60 p-1",
	children: items.map((item) => /* @__PURE__ */ jsx("div", {
		className: `flex-1 rounded-lg py-2 text-center text-[11px] font-medium ${active === item.id ? "bg-[#1C1C1E] text-white" : "coach-text-muted"}`,
		children: item.label
	}, item.id))
});
//#endregion
//#region app/coach_app/components/RepetitionTracker.tsx
var RepetitionTracker = ({ goal }) => {
	const progress = Math.round(goal.current / goal.target * 100);
	return /* @__PURE__ */ jsxs("div", {
		className: "coach-glass-card p-4",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-[14px] font-medium coach-text",
					children: goal.label
				}), /* @__PURE__ */ jsxs("p", {
					className: "text-[13px] font-semibold coach-text",
					children: [goal.current, /* @__PURE__ */ jsxs("span", {
						className: "coach-text-faint",
						children: [" / ", goal.target]
					})]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "coach-rep-dots mt-3",
				children: Array.from({ length: goal.target }, (_, i) => /* @__PURE__ */ jsx("span", { className: `coach-rep-dots__dot ${i < goal.current ? "coach-rep-dots__dot--filled" : ""}` }, i))
			}),
			/* @__PURE__ */ jsx("div", {
				className: "coach-progress-bar mt-3",
				children: /* @__PURE__ */ jsx("div", {
					className: "coach-progress-bar__fill",
					style: { width: `${progress}%` }
				})
			})
		]
	});
};
//#endregion
//#region app/coach_app/components/TimerDrillBlock.tsx
var formatTime = (seconds) => {
	return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;
};
var TimerDrillBlock = ({ drill }) => /* @__PURE__ */ jsxs("div", {
	className: "coach-glass-card p-4",
	children: [/* @__PURE__ */ jsxs("div", {
		className: "flex items-start justify-between gap-3",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
			className: "text-[14px] font-medium coach-text",
			children: drill.title
		}), /* @__PURE__ */ jsx("p", {
			className: "mt-1 text-[12px] leading-relaxed coach-text-muted",
			children: drill.instruction
		})] }), /* @__PURE__ */ jsx("div", {
			className: "coach-timer-ring",
			children: /* @__PURE__ */ jsx("span", {
				className: "coach-timer-ring__value",
				children: formatTime(drill.durationSeconds)
			})
		})]
	}), /* @__PURE__ */ jsx("div", {
		className: "coach-timer-bar mt-3",
		children: /* @__PURE__ */ jsx("div", {
			className: "coach-timer-bar__fill",
			style: { width: "0%" }
		})
	})]
});
//#endregion
//#region app/coach_app/components/TraceTemplateBlock.tsx
var TraceTemplateBlock = ({ template }) => /* @__PURE__ */ jsxs("div", {
	className: "coach-glass-card overflow-hidden",
	children: [/* @__PURE__ */ jsxs("div", {
		className: "coach-trace-zone",
		children: [
			/* @__PURE__ */ jsx(CoachImage, {
				src: template.templateImage,
				alt: template.title,
				rounded: "rounded-none"
			}),
			/* @__PURE__ */ jsx("div", {
				className: "coach-trace-zone__overlay",
				style: { opacity: template.opacity },
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ jsx("span", {
				className: "coach-trace-zone__hint",
				children: "Обводите здесь"
			})
		]
	}), /* @__PURE__ */ jsxs("div", {
		className: "p-4",
		children: [/* @__PURE__ */ jsx("p", {
			className: "text-[14px] font-medium coach-text",
			children: template.title
		}), /* @__PURE__ */ jsx("p", {
			className: "mt-1 text-[12px] leading-relaxed coach-text-muted",
			children: template.description
		})]
	})]
});
//#endregion
//#region app/coach_app/components/WarmupListBlock.tsx
var WarmupListBlock = ({ strokes }) => /* @__PURE__ */ jsxs("div", {
	className: "coach-glass-card p-4",
	children: [/* @__PURE__ */ jsx("p", {
		className: "coach-section-label mb-3",
		children: "Разминочные штрихи"
	}), /* @__PURE__ */ jsx("ul", {
		className: "coach-warmup-list",
		children: strokes.map((stroke) => /* @__PURE__ */ jsxs("li", {
			className: "coach-warmup-list__item",
			children: [/* @__PURE__ */ jsx("span", {
				className: "coach-warmup-list__name",
				children: stroke.name
			}), /* @__PURE__ */ jsxs("span", {
				className: "coach-warmup-list__count",
				children: ["×", stroke.count]
			})]
		}, stroke.id))
	})]
});
//#endregion
//#region app/coach_app/components/WordPracticeBlock.tsx
var WordPracticeBlock = ({ practice }) => /* @__PURE__ */ jsxs("div", {
	className: "coach-glass-card p-4",
	children: [
		/* @__PURE__ */ jsx("p", {
			className: "coach-section-label mb-3",
			children: "Практика слова"
		}),
		/* @__PURE__ */ jsx("p", {
			className: "mb-3 text-center text-[36px] font-semibold leading-none coach-text",
			children: practice.word
		}),
		/* @__PURE__ */ jsx("div", {
			className: "coach-word-letters",
			children: practice.letters.map((letter, index) => {
				const isActive = index === practice.activeIndex;
				const isDone = index < practice.activeIndex;
				return /* @__PURE__ */ jsxs("div", {
					className: `coach-word-letters__cell ${isActive ? "coach-word-letters__cell--active" : ""} ${isDone ? "coach-word-letters__cell--done" : ""}`,
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-[22px] font-semibold",
						children: letter
					}), isActive && /* @__PURE__ */ jsx("span", {
						className: "coach-word-letters__badge",
						children: "Сейчас"
					})]
				}, `${letter}-${index}`);
			})
		})
	]
});
//#endregion
//#region app/coach_app/data/exerciseBlocks.ts
var traceTemplate = {
	id: "trace-a",
	title: "Обведите букву по шаблону",
	description: "Положите кальку поверх образца и проведите три штриха в нужном порядке: левая диагональ, правая диагональ, перекладина.",
	templateImage: coachImages.buildSteps[0],
	opacity: .35
};
var timerDrill = {
	id: "warmup-timer",
	title: "Двухминутная разминка",
	durationSeconds: 120,
	instruction: "Чередуйте наклонные линии и лёгкие выходы пера, не торопясь и сохраняя одинаковый угол."
};
var repetitionGoal = {
	id: "rep-a",
	target: 10,
	current: 6,
	label: "Повторы буквы А"
};
var wordPractice = {
	id: "word-mir",
	word: "Мир",
	letters: [
		"М",
		"и",
		"р"
	],
	activeIndex: 1
};
var formQuiz = {
	id: "quiz-slant",
	question: "Какая буква А лучше держит наклон 55°?",
	options: [
		{
			id: "a",
			label: "Вариант 1",
			image: coachImages.mistakes[0].src,
			correct: false
		},
		{
			id: "b",
			label: "Вариант 2",
			image: coachImages.mistakes[2].src,
			correct: true
		},
		{
			id: "c",
			label: "Вариант 3",
			image: coachImages.mistakes[1].src,
			correct: false
		}
	]
};
var miniTestQuestions = [
	{
		id: "slant",
		question: "Какой наклон держим в прописной букве А?",
		options: [
			{
				id: "a",
				text: "35°",
				correct: false
			},
			{
				id: "b",
				text: "55°",
				correct: true
			},
			{
				id: "c",
				text: "90°",
				correct: false
			}
		]
	},
	{
		id: "crossbar",
		question: "Где лучше поставить перекладину?",
		options: [
			{
				id: "a",
				text: "Чуть выше середины",
				correct: true
			},
			{
				id: "b",
				text: "На базовой линии",
				correct: false
			},
			{
				id: "c",
				text: "В самой вершине",
				correct: false
			}
		]
	},
	{
		id: "pressure",
		question: "Когда усиливаем нажим пера?",
		options: [
			{
				id: "a",
				text: "На движении вверх",
				correct: false
			},
			{
				id: "b",
				text: "На паузе",
				correct: false
			},
			{
				id: "c",
				text: "На движении вниз",
				correct: true
			}
		]
	},
	{
		id: "guides",
		question: "Зачем нужны направляющие линии?",
		options: [
			{
				id: "a",
				text: "Чтобы держать высоту и наклон",
				correct: true
			},
			{
				id: "b",
				text: "Чтобы заменить разминку",
				correct: false
			},
			{
				id: "c",
				text: "Чтобы писать быстрее",
				correct: false
			}
		]
	}
];
var warmupStrokes = [
	{
		id: "1",
		name: "Наклонные линии",
		count: 8
	},
	{
		id: "2",
		name: "Лёгкий вход пера",
		count: 6
	},
	{
		id: "3",
		name: "Нажим вниз",
		count: 6
	}
];
//#endregion
//#region app/coach_app/data/lesson.ts
var uppercaseLetterA = {
	id: "letter-a",
	title: "Большая буква А",
	meta: {
		number: 1,
		section: "Буквы",
		topic: "Большая буква А"
	},
	currentStep: 3,
	totalSteps: 5,
	progress: 70,
	coverImage: coachImages.lessonDemo,
	technique: "В этом уроке вы разберёте классическую прописную А: построение по направляющим, наклон 55°, контраст нажима и положение перекладины. Цель — написать устойчивую букву без завала и лишней ширины.",
	theorySections: [
		{
			id: "anatomy",
			title: "Конструкция буквы",
			body: "Буква строится из двух диагональных штрихов и короткой перекладины. Вершина находится над средней линией, а обе ножки уверенно опираются на базовую линию.",
			image: coachImages.buildSteps[0]
		},
		{
			id: "slant",
			title: "Наклон и ритм",
			body: "Обе диагонали держат одинаковый наклон около 55°. Если одна ножка уходит сильнее, буква сразу выглядит нестабильной и теряет ритм строки.",
			image: coachImages.buildSteps[1]
		},
		{
			id: "weight",
			title: "Нажим пера",
			body: "На нисходящем движении нажим усиливается, на выходе ослабляется. Такой контраст даёт живой каллиграфический характер без тяжёлых пятен.",
			image: coachImages.buildSteps[2]
		}
	],
	theoryTheses: [
		{
			id: "1",
			text: "Наклон 55°"
		},
		{
			id: "2",
			text: "Вершина выше средней линии"
		},
		{
			id: "3",
			text: "Перекладина выше середины"
		},
		{
			id: "4",
			text: "Два диагональных штриха"
		},
		{
			id: "5",
			text: "Давление на нисходящем"
		},
		{
			id: "6",
			text: "Лёгкие направляющие"
		}
	],
	theoryTip: {
		id: "pro-tip",
		text: "Перед чистовым листом сделайте 3 медленных прохода по воздуху: это помогает запомнить траекторию и не ломать вершину буквы."
	},
	theoryTerms: [
		{
			id: "apex",
			term: "Вершина",
			definition: "Точка, где сходятся две диагонали"
		},
		{
			id: "crossbar",
			term: "Перекладина",
			definition: "Короткий штрих между ножками буквы"
		},
		{
			id: "waist",
			term: "Средняя линия",
			definition: "Ориентир для высоты перекладины"
		},
		{
			id: "base",
			term: "Базовая линия",
			definition: "Нижняя линия, на которую опирается буква"
		}
	],
	theoryChecklist: [
		{
			id: "1",
			text: "Размечены базовая, средняя и верхняя линии",
			checked: true
		},
		{
			id: "2",
			text: "Проверен одинаковый наклон диагоналей",
			checked: true
		},
		{
			id: "3",
			text: "Перекладина стоит чуть выше центра",
			checked: false
		},
		{
			id: "4",
			text: "Нажим усиливается только на движении вниз",
			checked: false
		}
	],
	strokeOrder: [
		{
			id: "1",
			label: "Левая диагональ",
			image: coachImages.buildSteps[0]
		},
		{
			id: "2",
			label: "Правая диагональ",
			image: coachImages.buildSteps[1]
		},
		{
			id: "3",
			label: "Перекладина",
			image: coachImages.buildSteps[2]
		}
	],
	theoryVideo: {
		id: "demo-video",
		title: "Демонстрация: прописная А в три штриха",
		duration: "1:24",
		thumbnail: coachImages.lessonDemo
	},
	mistakes: [
		{
			id: "slant",
			label: "Сбитый наклон",
			correct: false,
			image: coachImages.mistakes[0].src,
			objectPosition: coachImages.mistakes[0].position
		},
		{
			id: "spacing",
			label: "Слишком широкая форма",
			correct: false,
			image: coachImages.mistakes[1].src,
			objectPosition: coachImages.mistakes[1].position
		},
		{
			id: "correct",
			label: "Правильная форма",
			correct: true,
			image: coachImages.mistakes[2].src,
			objectPosition: coachImages.mistakes[2].position
		}
	],
	exerciseSteps: [
		{
			id: "1",
			title: "Разметьте направляющие",
			description: "Отметьте базовую, среднюю и верхнюю линии, затем добавьте наклонные направляющие под 55°.",
			tip: "Линии должны быть едва заметными, чтобы не спорить с чистовым штрихом.",
			image: coachImages.buildSteps[0]
		},
		{
			id: "2",
			title: "Проведите левую диагональ",
			description: "Начните с вершины и ведите штрих вниз-влево, постепенно усиливая нажим.",
			tip: "Не ускоряйтесь в конце: ножка должна спокойно прийти на базовую линию.",
			image: coachImages.buildSteps[1]
		},
		{
			id: "3",
			title: "Добавьте правую диагональ и перекладину",
			description: "Повторите наклон правой ножки и поставьте перекладину чуть выше середины буквы.",
			tip: "Перекладину лучше писать одним уверенным движением слева направо.",
			image: coachImages.buildSteps[2]
		}
	],
	practiceTask: "Напишите прописную А 10 раз: первые 5 повторов по направляющим, затем 5 повторов без подсказок.",
	practiceImage: coachImages.practice,
	aiReview: {
		score: 8,
		maxScore: 10,
		feedback: [
			{
				id: "1",
				text: "Наклон диагоналей стал ровнее",
				positive: true
			},
			{
				id: "2",
				text: "Перекладина стоит на правильной высоте",
				positive: true
			},
			{
				id: "3",
				text: "Во втором повторе левая ножка получилась слишком широкой",
				positive: false
			}
		]
	},
	aiReviewImage: coachImages.aiReviewUpload,
	chatMessages: [
		{
			id: "1",
			role: "assistant",
			time: "10:02",
			text: "Привет! Я помогу разобрать прописную А. Можешь спросить про наклон, порядок штрихов или типичные ошибки."
		},
		{
			id: "2",
			role: "user",
			time: "10:03",
			text: "Где должна быть перекладина?"
		},
		{
			id: "3",
			role: "assistant",
			time: "10:03",
			text: "Ставьте её чуть выше визуального центра. Так верхняя часть остаётся лёгкой, а буква не выглядит тяжёлой."
		},
		{
			id: "4",
			role: "user",
			time: "10:04",
			text: "Диагонали получаются разными. Что проверить?"
		},
		{
			id: "5",
			role: "assistant",
			time: "10:04",
			text: "Проверьте, что обе диагонали идут по параллельным направляющим. Сначала ведите движение медленно без нажима, затем повторите с рабочим давлением."
		}
	]
};
//#endregion
//#region app/coach_app/screens/ExerciseBlocksScreen.tsx
var ExerciseBlocksScreen = () => {
	const lesson = uppercaseLetterA;
	return /* @__PURE__ */ jsxs(ScreenShell$2, { children: [
		/* @__PURE__ */ jsx(StatusBar$2, {}),
		/* @__PURE__ */ jsx(LessonHeader, {
			title: lesson.title,
			badge: "Типы упражнений",
			progress: lesson.progress
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mb-4 space-y-3",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "coach-section-label",
				children: "Обводка"
			}), /* @__PURE__ */ jsx(TraceTemplateBlock, { template: traceTemplate })]
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mb-4 space-y-3",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "coach-section-label",
				children: "Таймер"
			}), /* @__PURE__ */ jsx(TimerDrillBlock, { drill: timerDrill })]
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mb-4 space-y-3",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "coach-section-label",
				children: "Повторы"
			}), /* @__PURE__ */ jsx(RepetitionTracker, { goal: repetitionGoal })]
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mb-4 space-y-3",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "coach-section-label",
				children: "Слово"
			}), /* @__PURE__ */ jsx(WordPracticeBlock, { practice: wordPractice })]
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mb-4 space-y-3",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "coach-section-label",
				children: "Мини-квиз"
			}), /* @__PURE__ */ jsx(FormQuizBlock, { quiz: formQuiz })]
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mb-4 space-y-3",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "coach-section-label",
				children: "Разминка"
			}), /* @__PURE__ */ jsx(WarmupListBlock, { strokes: warmupStrokes })]
		}),
		/* @__PURE__ */ jsx(LessonSubnav, { active: "exercise" }),
		/* @__PURE__ */ jsx("div", { className: "pb-8" })
	] });
};
//#endregion
//#region app/coach_app/components/ExerciseGuide.tsx
var ExerciseGuide = ({ steps, activeIndex = 0 }) => /* @__PURE__ */ jsx("div", {
	className: "space-y-2",
	children: steps.map((step, index) => {
		const isActive = index === activeIndex;
		const isDone = index < activeIndex;
		return /* @__PURE__ */ jsx("div", {
			className: `coach-glass-card p-3 ${isActive ? "ring-1 ring-[rgba(0,0,0,0.12)]" : ""} ${isDone ? "opacity-60" : ""}`,
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex gap-3",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: `flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold ${isActive ? "bg-[#1C1C1E] text-white" : "border border-[rgba(0,0,0,0.1)] coach-text-muted"}`,
						children: isDone ? "✓" : index + 1
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "text-[14px] font-medium coach-text",
								children: step.title
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-1 text-[12px] leading-relaxed coach-text-muted",
								children: step.description
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "mt-2 text-[11px] coach-text-faint",
								children: ["Совет: ", step.tip]
							})
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "h-14 w-14 shrink-0 overflow-hidden rounded-lg",
						children: /* @__PURE__ */ jsx(CoachImage, {
							src: step.image,
							alt: step.title,
							rounded: "rounded-lg"
						})
					})
				]
			})
		}, step.id);
	})
});
//#endregion
//#region app/coach_app/components/PhotoUploadZone.tsx
var PhotoUploadZone = ({ empty = true }) => /* @__PURE__ */ jsxs("div", {
	className: "coach-upload-zone flex flex-col items-center justify-center px-4 py-10",
	children: [
		/* @__PURE__ */ jsx("div", {
			className: "flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(0,0,0,0.08)] bg-white/80",
			children: /* @__PURE__ */ jsxs("svg", {
				width: "22",
				height: "22",
				viewBox: "0 0 22 22",
				fill: "none",
				"aria-hidden": "true",
				className: "coach-text-muted",
				children: [
					/* @__PURE__ */ jsx("rect", {
						x: "3",
						y: "5",
						width: "16",
						height: "12",
						rx: "2",
						stroke: "currentColor",
						strokeWidth: "1.3"
					}),
					/* @__PURE__ */ jsx("circle", {
						cx: "8",
						cy: "10",
						r: "1.5",
						stroke: "currentColor",
						strokeWidth: "1.3"
					}),
					/* @__PURE__ */ jsx("path", {
						d: "M3 15L8 11L13 14L19 9",
						stroke: "currentColor",
						strokeWidth: "1.3",
						strokeLinecap: "round"
					})
				]
			})
		}),
		/* @__PURE__ */ jsx("p", {
			className: "mt-3 text-[14px] font-medium coach-text",
			children: empty ? "Загрузите работу" : "Заменить фото"
		}),
		/* @__PURE__ */ jsx("p", {
			className: "mt-1 text-center text-[12px] coach-text-muted",
			children: "Сфотографируйте лист с практикой, чтобы получить разбор ошибок"
		})
	]
});
//#endregion
//#region app/coach_app/components/PrimaryButton.tsx
var PrimaryButton$3 = ({ children, onClick, className = "", variant = "solid" }) => /* @__PURE__ */ jsx("button", {
	type: "button",
	onClick,
	className: `flex h-12 w-full items-center justify-center rounded-xl text-[14px] font-semibold tracking-[-0.01em] transition active:scale-[0.98] ${variant === "solid" ? "bg-[#1C1C1E] text-white" : "border border-[rgba(0,0,0,0.1)] bg-white/80 coach-text"} ${className}`,
	children
});
//#endregion
//#region app/coach_app/screens/ExerciseScreen.tsx
var ExerciseScreen = () => {
	const lesson = uppercaseLetterA;
	return /* @__PURE__ */ jsxs(ScreenShell$2, { children: [
		/* @__PURE__ */ jsx(StatusBar$2, {}),
		/* @__PURE__ */ jsx(LessonHeader, {
			title: lesson.title,
			badge: "Упражнение",
			stepLabel: `${lesson.currentStep} из ${lesson.totalSteps} шагов`,
			progress: lesson.progress
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mb-4",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "coach-section-label mb-3",
				children: "Пошаговая практика"
			}), /* @__PURE__ */ jsx(ExerciseGuide, {
				steps: lesson.exerciseSteps,
				activeIndex: 1
			})]
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "coach-glass-card mb-4 overflow-hidden",
			children: [/* @__PURE__ */ jsx("div", {
				className: "h-[100px]",
				children: /* @__PURE__ */ jsx(CoachImage, {
					src: lesson.practiceImage,
					alt: "Образец для практики",
					rounded: "rounded-none"
				})
			}), /* @__PURE__ */ jsxs("div", {
				className: "p-4",
				children: [/* @__PURE__ */ jsx("p", {
					className: "coach-section-label",
					children: "Задание"
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-2 text-[15px] font-medium coach-text",
					children: lesson.practiceTask
				})]
			})]
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mb-4",
			children: [
				/* @__PURE__ */ jsx("h2", {
					className: "coach-section-label mb-3",
					children: "Проверка работы"
				}),
				/* @__PURE__ */ jsx(PhotoUploadZone, {}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-3",
					children: /* @__PURE__ */ jsx(PrimaryButton$3, { children: "Отправить на проверку" })
				})
			]
		}),
		/* @__PURE__ */ jsx(LessonSubnav, { active: "exercise" }),
		/* @__PURE__ */ jsx("div", { className: "pb-8" })
	] });
};
//#endregion
//#region app/coach_app/components/ChallengeCard.tsx
var ChallengeCard = ({ challenge }) => /* @__PURE__ */ jsxs("div", {
	className: "coach-home-challenge coach-glass-card overflow-hidden",
	children: [/* @__PURE__ */ jsx("div", {
		className: "coach-home-challenge__media",
		children: /* @__PURE__ */ jsx(CoachImage, {
			src: challenge.image,
			alt: "Задание дня",
			rounded: "rounded-none"
		})
	}), /* @__PURE__ */ jsxs("div", {
		className: "coach-home-challenge__body",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "coach-home-challenge__top",
				children: [/* @__PURE__ */ jsx("span", {
					className: "coach-home-challenge__badge",
					children: "Задание дня"
				}), /* @__PURE__ */ jsxs("span", {
					className: "coach-home-challenge__xp",
					children: [
						"+",
						challenge.xp,
						" XP"
					]
				})]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "coach-home-challenge__task",
				children: challenge.task
			}),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				className: "coach-home-challenge__action",
				children: "Начать"
			})
		]
	})]
});
//#endregion
//#region app/coach_app/components/HomeContinueHero.tsx
var HomeContinueHero = ({ lesson, lessonNumber, lessonTotal }) => /* @__PURE__ */ jsxs("section", {
	className: "coach-home-hero coach-glass-card overflow-hidden",
	children: [/* @__PURE__ */ jsxs("div", {
		className: "coach-home-hero__media",
		children: [/* @__PURE__ */ jsx(CoachImage, {
			src: lesson.image,
			alt: lesson.title,
			rounded: "rounded-none"
		}), /* @__PURE__ */ jsx("div", {
			className: "coach-home-hero__gradient",
			"aria-hidden": "true"
		})]
	}), /* @__PURE__ */ jsxs("div", {
		className: "coach-home-hero__body",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "coach-home-hero__meta",
				children: [/* @__PURE__ */ jsxs("span", {
					className: "coach-home-hero__badge",
					children: [
						"Урок ",
						lessonNumber,
						" · ",
						lessonTotal
					]
				}), /* @__PURE__ */ jsxs("span", {
					className: "coach-home-hero__progress-text",
					children: [lesson.progress, "%"]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "coach-home-hero__main",
				children: [/* @__PURE__ */ jsx("span", {
					className: "coach-home-hero__glyph",
					children: lesson.glyph
				}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "coach-home-hero__label",
					children: "Продолжить"
				}), /* @__PURE__ */ jsx("h2", {
					className: "coach-home-hero__title",
					children: lesson.title
				})] })]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "coach-home-hero__bar",
				children: /* @__PURE__ */ jsx("div", {
					className: "coach-home-hero__bar-fill",
					style: { width: `${lesson.progress}%` }
				})
			}),
			/* @__PURE__ */ jsxs("button", {
				type: "button",
				className: "coach-home-hero__cta",
				children: ["Продолжить урок", /* @__PURE__ */ jsx("svg", {
					width: "16",
					height: "16",
					viewBox: "0 0 16 16",
					fill: "none",
					"aria-hidden": "true",
					children: /* @__PURE__ */ jsx("path", {
						d: "M6 3L12 8L6 13",
						stroke: "currentColor",
						strokeWidth: "1.6",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				})]
			})
		]
	})]
});
//#endregion
//#region app/coach_app/components/HomeHeader.tsx
var HomeHeader = ({ profile, courseTitle, courseProgress }) => /* @__PURE__ */ jsxs("header", {
	className: "coach-home-header",
	children: [
		/* @__PURE__ */ jsxs("div", { children: [
			/* @__PURE__ */ jsx("p", {
				className: "coach-home-header__greeting",
				children: "Доброе утро"
			}),
			/* @__PURE__ */ jsx("h1", {
				className: "coach-home-header__name",
				children: profile.name
			}),
			/* @__PURE__ */ jsx("p", {
				className: "coach-home-header__course",
				children: courseTitle
			})
		] }),
		/* @__PURE__ */ jsxs("div", {
			className: "coach-home-header__stats",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "coach-home-header__pill",
				children: [/* @__PURE__ */ jsx("span", {
					className: "coach-home-header__pill-value",
					children: profile.streak
				}), /* @__PURE__ */ jsx("span", {
					className: "coach-home-header__pill-label",
					children: "дней"
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "coach-home-header__pill coach-home-header__pill--dark",
				children: /* @__PURE__ */ jsxs("span", {
					className: "coach-home-header__pill-value",
					children: ["Ур. ", profile.level]
				})
			})]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "coach-home-header__progress",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "coach-home-header__progress-top",
				children: [/* @__PURE__ */ jsx("span", {
					className: "coach-section-label",
					children: "Прогресс курса"
				}), /* @__PURE__ */ jsxs("span", {
					className: "coach-home-header__progress-value",
					children: [courseProgress, "%"]
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "coach-progress-bar",
				children: /* @__PURE__ */ jsx("div", {
					className: "coach-progress-bar__fill",
					style: { width: `${courseProgress}%` }
				})
			})]
		})
	]
});
//#endregion
//#region app/coach_app/components/HomeJourneyPath.tsx
var getNodeLabel = (lesson) => {
	const letters = {
		"letter-a": "А",
		"letter-b": "Б",
		"letter-c": "В",
		"letter-d": "Г",
		"letter-e": "Л",
		"letter-f": "Р"
	};
	if (letters[lesson.id]) return letters[lesson.id];
	if (lesson.id.startsWith("letter-")) return lesson.id.replace("letter-", "").toUpperCase();
	if (lesson.id === "intro") return "1";
	return lesson.title.charAt(0);
};
var getShortTitle = (lesson) => {
	if (lesson.id === "intro") return "Введение";
	if (lesson.id.startsWith("letter-")) return `Буква ${getNodeLabel(lesson)}`;
	return lesson.title.replace("Слово: ", "");
};
var CheckIcon = () => /* @__PURE__ */ jsx("svg", {
	width: "12",
	height: "12",
	viewBox: "0 0 12 12",
	fill: "none",
	"aria-hidden": "true",
	children: /* @__PURE__ */ jsx("path", {
		d: "M2.5 6L5 8.5L9.5 4",
		stroke: "currentColor",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		strokeLinejoin: "round"
	})
});
var LockIcon = () => /* @__PURE__ */ jsxs("svg", {
	width: "11",
	height: "11",
	viewBox: "0 0 11 11",
	fill: "none",
	"aria-hidden": "true",
	children: [/* @__PURE__ */ jsx("rect", {
		x: "2.5",
		y: "5",
		width: "6",
		height: "4",
		rx: "0.8",
		stroke: "currentColor",
		strokeWidth: "1.1"
	}), /* @__PURE__ */ jsx("path", {
		d: "M4 5V3.8C4 3 4.7 2.2 5.5 2.2C6.3 2.2 7 3 7 3.8V5",
		stroke: "currentColor",
		strokeWidth: "1.1"
	})]
});
var HomeJourneyPath = ({ lessons }) => {
	const completedCount = lessons.filter((lesson) => lesson.status === "completed").length;
	return /* @__PURE__ */ jsxs("div", {
		className: "coach-path-track coach-glass-card",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "coach-path-track__header",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
				className: "coach-path-track__title",
				children: "Ваш путь"
			}), /* @__PURE__ */ jsxs("p", {
				className: "coach-path-track__subtitle",
				children: [
					completedCount,
					" из ",
					lessons.length,
					" уроков"
				]
			})] }), /* @__PURE__ */ jsx("div", {
				className: "coach-path-track__meter",
				children: /* @__PURE__ */ jsx("div", {
					className: "coach-path-track__meter-fill",
					style: { width: `${completedCount / lessons.length * 100}%` }
				})
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "coach-path-track__scroll",
			children: lessons.map((lesson, index) => {
				const isLast = index === lessons.length - 1;
				const lineDone = lesson.status === "completed";
				return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs("div", {
					className: `coach-path-track__item coach-path-track__item--${lesson.status}`,
					"aria-current": lesson.status === "current" ? "step" : void 0,
					children: [lesson.status === "current" && /* @__PURE__ */ jsx("div", {
						className: "coach-path-track__preview",
						children: /* @__PURE__ */ jsx(CoachImage, {
							src: lesson.image,
							alt: lesson.title,
							rounded: "rounded-lg"
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "coach-path-track__node-col",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "coach-path-track__node",
								children: [
									lesson.status === "completed" && /* @__PURE__ */ jsx(CheckIcon, {}),
									lesson.status === "current" && /* @__PURE__ */ jsx("span", {
										className: "coach-path-track__glyph",
										children: getNodeLabel(lesson)
									}),
									lesson.status === "locked" && /* @__PURE__ */ jsx(LockIcon, {}),
									lesson.status === "current" && /* @__PURE__ */ jsx("span", {
										className: "coach-path-track__pulse",
										"aria-hidden": "true"
									})
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "coach-path-track__label",
								children: getShortTitle(lesson)
							}),
							lesson.status === "current" && /* @__PURE__ */ jsxs("span", {
								className: "coach-path-track__badge",
								children: [lesson.progress, "%"]
							})
						]
					})]
				}), !isLast && /* @__PURE__ */ jsx("div", {
					className: `coach-path-track__connector ${lineDone ? "coach-path-track__connector--done" : ""}`,
					"aria-hidden": "true"
				})] }, lesson.id);
			})
		})]
	});
};
//#endregion
//#region app/coach_app/components/WorkGallery.tsx
var WorkGallery = ({ works }) => {
	const [featured, ...rest] = works;
	return /* @__PURE__ */ jsxs("div", {
		className: "coach-home-works",
		children: [featured && /* @__PURE__ */ jsxs("div", {
			className: "coach-home-works__featured coach-glass-card overflow-hidden",
			children: [/* @__PURE__ */ jsx("div", {
				className: "coach-home-works__featured-media",
				children: /* @__PURE__ */ jsx(CoachImage, {
					src: featured.image,
					alt: featured.label,
					rounded: "rounded-none"
				})
			}), /* @__PURE__ */ jsxs("div", {
				className: "coach-home-works__featured-body",
				children: [/* @__PURE__ */ jsx("p", {
					className: "coach-section-label",
					children: "Последняя работа"
				}), /* @__PURE__ */ jsx("p", {
					className: "coach-home-works__featured-title",
					children: featured.label
				})]
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "coach-home-works__grid",
			children: rest.map((work) => /* @__PURE__ */ jsxs("div", {
				className: "coach-home-works__item coach-glass-card overflow-hidden",
				children: [/* @__PURE__ */ jsx("div", {
					className: "coach-home-works__item-media",
					children: /* @__PURE__ */ jsx(CoachImage, {
						src: work.image,
						alt: work.label,
						rounded: "rounded-none"
					})
				}), /* @__PURE__ */ jsx("p", {
					className: "coach-home-works__item-label",
					children: work.label
				})]
			}, work.id))
		})]
	});
};
//#endregion
//#region app/coach_app/data/gallery.ts
var recentWorks = [
	{
		id: "1",
		label: "Буква А",
		image: coachImages.gallery.letterA
	},
	{
		id: "2",
		label: "Наклонные штрихи",
		image: coachImages.gallery.letterB
	},
	{
		id: "3",
		label: "Слово «Мир»",
		image: coachImages.gallery.hello
	}
];
//#endregion
//#region app/coach_app/data/user.ts
var userProfile = {
	name: "Кирилл",
	level: 7,
	streak: 12,
	overallProgress: 21
};
var currentLesson = {
	title: "Большая буква А",
	glyph: "А",
	progress: 70,
	image: coachImages.currentLesson,
	lessonNumber: 2
};
var dailyChallenge = {
	task: "Напишите слово «Мир» с ровным наклоном и одинаковыми интервалами",
	xp: 50,
	image: coachImages.challenge
};
//#endregion
//#region app/coach_app/screens/HomeScreen.tsx
var HomeScreen$1 = () => /* @__PURE__ */ jsxs(ScreenShell$2, {
	footer: /* @__PURE__ */ jsx(BottomTabBar, { activeTab: "home" }),
	children: [
		/* @__PURE__ */ jsx(StatusBar$2, {}),
		/* @__PURE__ */ jsx(HomeHeader, {
			profile: userProfile,
			courseTitle: calligraphyBasics.title,
			courseProgress: calligraphyBasics.progress
		}),
		/* @__PURE__ */ jsx(HomeContinueHero, {
			lesson: currentLesson,
			lessonNumber: currentLesson.lessonNumber,
			lessonTotal: calligraphyBasics.lessonCount
		}),
		/* @__PURE__ */ jsx("section", {
			className: "coach-home-section",
			children: /* @__PURE__ */ jsx(HomeJourneyPath, { lessons: calligraphyBasics.lessons })
		}),
		/* @__PURE__ */ jsx("section", {
			className: "coach-home-section",
			children: /* @__PURE__ */ jsx(ChallengeCard, { challenge: dailyChallenge })
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "coach-home-section coach-home-section--last",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "coach-home-section__title mb-3",
				children: "Недавние работы"
			}), /* @__PURE__ */ jsx(WorkGallery, { works: recentWorks })]
		})
	]
});
//#endregion
//#region app/coach_app/components/ChatBubble.tsx
var ChatBubble$1 = ({ message }) => {
	const isUser = message.role === "user";
	return /* @__PURE__ */ jsx("div", {
		className: `flex ${isUser ? "justify-end" : "justify-start"}`,
		children: /* @__PURE__ */ jsxs("div", {
			className: `max-w-[82%] rounded-2xl px-3.5 py-2.5 ${isUser ? "bg-[#1C1C1E] text-white" : "border border-[rgba(0,0,0,0.06)] bg-white/90 coach-text"}`,
			children: [/* @__PURE__ */ jsx("p", {
				className: "text-[13px] leading-relaxed",
				children: message.text
			}), /* @__PURE__ */ jsx("p", {
				className: `mt-1 text-[10px] ${isUser ? "text-white/50" : "coach-text-faint"}`,
				children: message.time
			})]
		})
	});
};
//#endregion
//#region app/coach_app/components/ChatComposer.tsx
var ChatComposer$1 = () => /* @__PURE__ */ jsx("div", {
	className: "border-t border-[rgba(0,0,0,0.06)] bg-white/70 px-3 py-3 backdrop-blur-md",
	children: /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ jsx("input", {
			type: "text",
			readOnly: true,
			placeholder: "Спросите про букву А...",
			className: "h-10 flex-1 rounded-xl border border-[rgba(0,0,0,0.08)] bg-white px-3 text-[13px] coach-text outline-none placeholder:text-[rgba(28,28,30,0.35)]"
		}), /* @__PURE__ */ jsx("button", {
			type: "button",
			className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1C1C1E] text-white",
			"aria-label": "Отправить",
			children: /* @__PURE__ */ jsx("svg", {
				width: "16",
				height: "16",
				viewBox: "0 0 16 16",
				fill: "none",
				"aria-hidden": "true",
				children: /* @__PURE__ */ jsx("path", {
					d: "M2.5 8L13.5 3L9 8L13.5 13L2.5 8Z",
					stroke: "currentColor",
					strokeWidth: "1.3",
					strokeLinejoin: "round"
				})
			})
		})]
	})
});
//#endregion
//#region app/coach_app/screens/LessonChatScreen.tsx
var LessonChatScreen = () => {
	const lesson = uppercaseLetterA;
	return /* @__PURE__ */ jsxs(ScreenShell$2, {
		footer: /* @__PURE__ */ jsx(ChatComposer$1, {}),
		children: [
			/* @__PURE__ */ jsx(StatusBar$2, {}),
			/* @__PURE__ */ jsx(LessonHeader, {
				title: lesson.title,
				badge: "AI-чат",
				progress: lesson.progress
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mb-4 text-[13px] coach-text-muted",
				children: "Задайте вопрос о наклоне, порядке штрихов или ошибках в вашей букве."
			}),
			/* @__PURE__ */ jsx("div", {
				className: "space-y-3 pb-4",
				children: lesson.chatMessages.map((message) => /* @__PURE__ */ jsx(ChatBubble$1, { message }, message.id))
			}),
			/* @__PURE__ */ jsx(LessonSubnav, { active: "chat" }),
			/* @__PURE__ */ jsx("div", { className: "pb-4" })
		]
	});
};
//#endregion
//#region app/coach_app/components/ChecklistBlock.tsx
var ChecklistBlock = ({ title = "Перед практикой", items }) => /* @__PURE__ */ jsxs("div", {
	className: "coach-glass-card p-4",
	children: [/* @__PURE__ */ jsx("p", {
		className: "coach-section-label mb-3",
		children: title
	}), /* @__PURE__ */ jsx("ul", {
		className: "coach-checklist",
		children: items.map((item) => /* @__PURE__ */ jsxs("li", {
			className: "coach-checklist__item",
			children: [/* @__PURE__ */ jsx("span", {
				className: `coach-checklist__mark ${item.checked ? "coach-checklist__mark--done" : ""}`,
				"aria-hidden": "true",
				children: item.checked ? "✓" : ""
			}), /* @__PURE__ */ jsx("span", {
				className: item.checked ? "coach-text-muted line-through" : "coach-text",
				children: item.text
			})]
		}, item.id))
	})]
});
//#endregion
//#region app/coach_app/components/LessonCoverHero.tsx
var LessonCoverHero = ({ image, meta, progress }) => /* @__PURE__ */ jsxs("section", {
	className: "coach-glass-card coach-lesson-cover mb-4 overflow-hidden",
	children: [/* @__PURE__ */ jsxs("div", {
		className: "coach-lesson-cover__media",
		children: [/* @__PURE__ */ jsx(CoachImage, {
			src: image,
			alt: meta.topic,
			rounded: "rounded-none"
		}), /* @__PURE__ */ jsx("div", {
			className: "coach-lesson-cover__gradient",
			"aria-hidden": "true"
		})]
	}), /* @__PURE__ */ jsxs("div", {
		className: "coach-lesson-cover__content",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "coach-lesson-cover__fields",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "coach-lesson-cover__field",
					children: [/* @__PURE__ */ jsx("span", {
						className: "coach-lesson-cover__label",
						children: "Урок"
					}), /* @__PURE__ */ jsx("span", {
						className: "coach-lesson-cover__value",
						children: meta.number
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "coach-lesson-cover__field",
					children: [/* @__PURE__ */ jsx("span", {
						className: "coach-lesson-cover__label",
						children: "раздел"
					}), /* @__PURE__ */ jsx("span", {
						className: "coach-lesson-cover__value",
						children: meta.section
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "coach-lesson-cover__field",
					children: [/* @__PURE__ */ jsx("span", {
						className: "coach-lesson-cover__label",
						children: "тема"
					}), /* @__PURE__ */ jsx("h1", {
						className: "coach-lesson-cover__value coach-lesson-cover__value--topic",
						children: meta.topic
					})]
				})
			]
		}), /* @__PURE__ */ jsx("div", {
			className: "coach-lesson-cover__progress",
			children: /* @__PURE__ */ jsx("div", {
				className: "coach-progress-bar",
				children: /* @__PURE__ */ jsx("div", {
					className: "coach-progress-bar__fill",
					style: { width: `${progress}%` }
				})
			})
		})]
	})]
});
//#endregion
//#region app/coach_app/components/MistakeCompare.tsx
var MistakeCompare = ({ mistakes }) => /* @__PURE__ */ jsx("div", {
	className: "grid grid-cols-3 gap-2",
	children: mistakes.map((mistake) => /* @__PURE__ */ jsxs("div", {
		className: `overflow-hidden rounded-xl border ${mistake.correct ? "border-[rgba(0,0,0,0.14)]" : "border-[rgba(0,0,0,0.06)]"}`,
		children: [/* @__PURE__ */ jsx("div", {
			className: "h-[72px]",
			children: /* @__PURE__ */ jsx(CoachImage, {
				src: mistake.image,
				alt: mistake.label,
				rounded: "rounded-none",
				objectPosition: mistake.objectPosition,
				className: mistake.correct ? "" : "opacity-70"
			})
		}), /* @__PURE__ */ jsxs("p", {
			className: "px-2 py-2 text-center text-[9px] leading-tight coach-text-muted",
			children: [
				mistake.correct ? "✓" : "✗",
				" ",
				mistake.label
			]
		})]
	}, mistake.id))
});
//#endregion
//#region app/coach_app/components/StrokeOrderBlock.tsx
var StrokeOrderBlock = ({ steps }) => /* @__PURE__ */ jsxs("div", {
	className: "coach-glass-card p-4",
	children: [/* @__PURE__ */ jsx("p", {
		className: "coach-section-label mb-3",
		children: "Порядок штрихов"
	}), /* @__PURE__ */ jsx("div", {
		className: "coach-stroke-order",
		children: steps.map((step, index) => /* @__PURE__ */ jsxs("div", {
			className: "coach-stroke-order__step",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "coach-stroke-order__num",
					children: index + 1
				}),
				/* @__PURE__ */ jsx("div", {
					className: "coach-stroke-order__thumb",
					children: /* @__PURE__ */ jsx(CoachImage, {
						src: step.image,
						alt: step.label,
						rounded: "rounded-lg"
					})
				}),
				/* @__PURE__ */ jsx("p", {
					className: "coach-stroke-order__label",
					children: step.label
				})
			]
		}, step.id))
	})]
});
//#endregion
//#region app/coach_app/components/TerminologyGrid.tsx
var TerminologyGrid = ({ terms }) => /* @__PURE__ */ jsx("div", {
	className: "coach-terminology-grid",
	children: terms.map((item) => /* @__PURE__ */ jsxs("div", {
		className: "coach-terminology-grid__item",
		children: [/* @__PURE__ */ jsx("p", {
			className: "coach-terminology-grid__term",
			children: item.term
		}), /* @__PURE__ */ jsx("p", {
			className: "coach-terminology-grid__def",
			children: item.definition
		})]
	}, item.id))
});
//#endregion
//#region app/coach_app/components/TheoryBlock.tsx
var TheoryBlock = ({ section }) => /* @__PURE__ */ jsxs("div", {
	className: "coach-glass-card overflow-hidden",
	children: [/* @__PURE__ */ jsx("div", {
		className: "h-[120px]",
		children: /* @__PURE__ */ jsx(CoachImage, {
			src: section.image,
			alt: section.title,
			rounded: "rounded-none"
		})
	}), /* @__PURE__ */ jsxs("div", {
		className: "p-4",
		children: [/* @__PURE__ */ jsx("h3", {
			className: "text-[15px] font-semibold coach-text",
			children: section.title
		}), /* @__PURE__ */ jsx("p", {
			className: "mt-2 text-[13px] leading-relaxed coach-text-muted",
			children: section.body
		})]
	})]
});
//#endregion
//#region app/coach_app/components/ThesisTagsBlock.tsx
var ThesisTagsBlock = ({ theses }) => /* @__PURE__ */ jsxs("div", {
	className: "coach-thesis-block",
	children: [/* @__PURE__ */ jsx("p", {
		className: "coach-section-label mb-3",
		children: "Основные тезисы"
	}), /* @__PURE__ */ jsx("div", {
		className: "coach-thesis-tags",
		children: theses.map((thesis) => /* @__PURE__ */ jsx("span", {
			className: "coach-thesis-tags__item",
			children: thesis.text
		}, thesis.id))
	})]
});
//#endregion
//#region app/coach_app/components/TipCallout.tsx
var TipCallout = ({ tip }) => /* @__PURE__ */ jsxs("div", {
	className: "coach-tip-callout",
	children: [/* @__PURE__ */ jsx("span", {
		className: "coach-tip-callout__badge",
		children: "Совет"
	}), /* @__PURE__ */ jsx("p", {
		className: "coach-tip-callout__text",
		children: tip.text
	})]
});
//#endregion
//#region app/coach_app/components/VideoPreviewBlock.tsx
var VideoPreviewBlock = ({ video }) => /* @__PURE__ */ jsxs("div", {
	className: "coach-glass-card overflow-hidden",
	children: [/* @__PURE__ */ jsxs("div", {
		className: "coach-video-preview",
		children: [/* @__PURE__ */ jsx(CoachImage, {
			src: video.thumbnail,
			alt: video.title,
			rounded: "rounded-none"
		}), /* @__PURE__ */ jsxs("div", {
			className: "coach-video-preview__overlay",
			children: [/* @__PURE__ */ jsx("span", {
				className: "coach-video-preview__play",
				"aria-hidden": "true",
				children: /* @__PURE__ */ jsx("svg", {
					width: "18",
					height: "18",
					viewBox: "0 0 18 18",
					fill: "none",
					children: /* @__PURE__ */ jsx("path", {
						d: "M6 4.5L13.5 9L6 13.5V4.5Z",
						fill: "currentColor"
					})
				})
			}), /* @__PURE__ */ jsx("span", {
				className: "coach-video-preview__duration",
				children: video.duration
			})]
		})]
	}), /* @__PURE__ */ jsx("p", {
		className: "p-4 text-[14px] font-medium coach-text",
		children: video.title
	})]
});
//#endregion
//#region app/coach_app/screens/LessonScreen.tsx
var LessonScreen = () => {
	const lesson = uppercaseLetterA;
	return /* @__PURE__ */ jsxs(ScreenShell$2, { children: [
		/* @__PURE__ */ jsx(StatusBar$2, {}),
		/* @__PURE__ */ jsx(LessonCoverHero, {
			image: lesson.coverImage,
			meta: lesson.meta,
			progress: lesson.progress
		}),
		/* @__PURE__ */ jsx("p", {
			className: "mb-4 text-[13px] leading-relaxed coach-text-muted",
			children: lesson.technique
		}),
		/* @__PURE__ */ jsx("section", {
			className: "mb-4",
			children: /* @__PURE__ */ jsx(ThesisTagsBlock, { theses: lesson.theoryTheses })
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mb-4 space-y-3",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "coach-section-label",
				children: "Теория"
			}), lesson.theorySections.map((section) => /* @__PURE__ */ jsx(TheoryBlock, { section }, section.id))]
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mb-4",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "coach-section-label mb-3",
				children: "Термины"
			}), /* @__PURE__ */ jsx(TerminologyGrid, { terms: lesson.theoryTerms })]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "mb-4",
			children: /* @__PURE__ */ jsx(StrokeOrderBlock, { steps: lesson.strokeOrder })
		}),
		/* @__PURE__ */ jsx("section", {
			className: "mb-4",
			children: /* @__PURE__ */ jsx(VideoPreviewBlock, { video: lesson.theoryVideo })
		}),
		/* @__PURE__ */ jsx("section", {
			className: "mb-4",
			children: /* @__PURE__ */ jsx(TipCallout, { tip: lesson.theoryTip })
		}),
		/* @__PURE__ */ jsx("section", {
			className: "mb-4",
			children: /* @__PURE__ */ jsx(ChecklistBlock, { items: lesson.theoryChecklist })
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mb-4",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "coach-section-label mb-3",
				children: "Типичные ошибки"
			}), /* @__PURE__ */ jsx(MistakeCompare, { mistakes: lesson.mistakes })]
		}),
		/* @__PURE__ */ jsx(LessonSubnav, { active: "theory" }),
		/* @__PURE__ */ jsx("div", {
			className: "pb-8 pt-4",
			children: /* @__PURE__ */ jsx(PrimaryButton$3, { children: "Перейти к практике" })
		})
	] });
};
//#endregion
//#region app/coach_app/components/MiniTestBlock.tsx
var MiniTestBlock = ({ questions }) => /* @__PURE__ */ jsx("div", {
	className: "coach-mini-test",
	children: questions.map((item, index) => /* @__PURE__ */ jsxs("section", {
		className: "coach-mini-test__card coach-glass-card",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "coach-mini-test__head",
			children: [/* @__PURE__ */ jsx("span", {
				className: "coach-mini-test__number",
				children: index + 1
			}), /* @__PURE__ */ jsx("p", {
				className: "coach-mini-test__question",
				children: item.question
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "coach-mini-test__tags",
			children: item.options.map((option) => /* @__PURE__ */ jsx("span", {
				className: "coach-mini-test__tag",
				children: option.text
			}, option.id))
		})]
	}, item.id))
});
//#endregion
//#region app/coach_app/screens/MiniTestScreen.tsx
var MiniTestScreen = () => {
	const lesson = uppercaseLetterA;
	return /* @__PURE__ */ jsxs(ScreenShell$2, { children: [
		/* @__PURE__ */ jsx(StatusBar$2, {}),
		/* @__PURE__ */ jsx(LessonHeader, {
			title: lesson.title,
			badge: "Мини-тест",
			stepLabel: "4 вопроса",
			progress: lesson.progress
		}),
		/* @__PURE__ */ jsx("p", {
			className: "mb-4 text-[13px] leading-relaxed coach-text-muted",
			children: "Проверьте, что вы запомнили ключевые правила перед практикой. Выберите один вариант в каждом вопросе."
		}),
		/* @__PURE__ */ jsx(MiniTestBlock, { questions: miniTestQuestions }),
		/* @__PURE__ */ jsx(LessonSubnav, { active: "exercise" }),
		/* @__PURE__ */ jsx("div", {
			className: "pb-8 pt-4",
			children: /* @__PURE__ */ jsx(PrimaryButton$3, { children: "Завершить тест" })
		})
	] });
};
//#endregion
//#region app/coach_app/screens/ProfileScreen.tsx
var stats = [
	{
		label: "Уровень",
		value: String(userProfile.level)
	},
	{
		label: "Серия",
		value: `${userProfile.streak} дн.`
	},
	{
		label: "Прогресс",
		value: `${userProfile.overallProgress}%`
	}
];
var menuItems = [
	"Мои работы",
	"Достижения",
	"Настройки",
	"Помощь"
];
var ProfileScreen = () => /* @__PURE__ */ jsxs(ScreenShell$2, {
	footer: /* @__PURE__ */ jsx(BottomTabBar, { activeTab: "profile" }),
	children: [
		/* @__PURE__ */ jsx(StatusBar$2, {}),
		/* @__PURE__ */ jsx("header", {
			className: "mb-5 pt-1",
			children: /* @__PURE__ */ jsx("h1", {
				className: "text-[24px] font-semibold tracking-[-0.02em] coach-text",
				children: "Профиль"
			})
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "coach-glass-card mb-4 flex items-center gap-4 p-4",
			children: [/* @__PURE__ */ jsx("div", {
				className: "h-16 w-16 shrink-0 overflow-hidden rounded-full border border-[rgba(0,0,0,0.06)]",
				children: /* @__PURE__ */ jsx(CoachImage, {
					src: coachImages.avatar,
					alt: "Аватар",
					rounded: "rounded-full"
				})
			}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
				className: "text-[17px] font-semibold coach-text",
				children: userProfile.name
			}), /* @__PURE__ */ jsx("p", {
				className: "text-[13px] coach-text-muted",
				children: "Ученик курса каллиграфии"
			})] })]
		}),
		/* @__PURE__ */ jsx("div", {
			className: "mb-4 grid grid-cols-3 gap-2",
			children: stats.map((stat) => /* @__PURE__ */ jsxs("div", {
				className: "coach-glass-card p-3 text-center",
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-[16px] font-semibold coach-text",
					children: stat.value
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-1 text-[10px] uppercase tracking-[0.08em] coach-text-faint",
					children: stat.label
				})]
			}, stat.label))
		}),
		/* @__PURE__ */ jsx("div", {
			className: "coach-glass-card overflow-hidden",
			children: menuItems.map((item, index) => /* @__PURE__ */ jsxs("div", {
				className: `flex items-center justify-between px-4 py-3.5 ${index < menuItems.length - 1 ? "border-b border-[rgba(0,0,0,0.05)]" : ""}`,
				children: [/* @__PURE__ */ jsx("span", {
					className: "text-[14px] coach-text",
					children: item
				}), /* @__PURE__ */ jsx("svg", {
					width: "14",
					height: "14",
					viewBox: "0 0 14 14",
					fill: "none",
					"aria-hidden": "true",
					className: "coach-text-faint",
					children: /* @__PURE__ */ jsx("path", {
						d: "M5 3L9 7L5 11",
						stroke: "currentColor",
						strokeWidth: "1.4",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				})]
			}, item))
		}),
		/* @__PURE__ */ jsx("div", { className: "pb-4" })
	]
});
//#endregion
//#region app/coach_app/frame.tsx
var CoachFrame = () => /* @__PURE__ */ jsxs("div", {
	className: "coach-root coach-showcase grid grid-cols-2 gap-10",
	children: [
		/* @__PURE__ */ jsx(PhoneFrame, {
			label: "Главная",
			children: /* @__PURE__ */ jsx(HomeScreen$1, {})
		}),
		/* @__PURE__ */ jsx(PhoneFrame, {
			label: "Курс",
			children: /* @__PURE__ */ jsx(CourseScreen, {})
		}),
		/* @__PURE__ */ jsx(PhoneFrame, {
			label: "Урок · Теория",
			children: /* @__PURE__ */ jsx(LessonScreen, {})
		}),
		/* @__PURE__ */ jsx(PhoneFrame, {
			label: "Упражнение",
			children: /* @__PURE__ */ jsx(ExerciseScreen, {})
		}),
		/* @__PURE__ */ jsx(PhoneFrame, {
			label: "Типы упражнений",
			children: /* @__PURE__ */ jsx(ExerciseBlocksScreen, {})
		}),
		/* @__PURE__ */ jsx(PhoneFrame, {
			label: "Мини-тест",
			children: /* @__PURE__ */ jsx(MiniTestScreen, {})
		}),
		/* @__PURE__ */ jsx(PhoneFrame, {
			label: "AI Чат",
			children: /* @__PURE__ */ jsx(LessonChatScreen, {})
		}),
		/* @__PURE__ */ jsx(PhoneFrame, {
			label: "Профиль",
			children: /* @__PURE__ */ jsx(ProfileScreen, {})
		})
	]
});
//#endregion
//#region app/forma_app/data/models.ts
var models = [
	{
		id: "1",
		name: "Керамическая ваза",
		status: "ready",
		description: "Гладкая белая ваза с узким горлышком. Сканировано из 12 ракурсов.",
		createdAt: "5 июн"
	},
	{
		id: "2",
		name: "Деревянный стул",
		status: "loading",
		progress: 67
	},
	{
		id: "3",
		name: "Часы настольные",
		status: "ready",
		description: "Настольные часы в ретро-стиле с металлическим корпусом.",
		createdAt: "3 июн"
	}
];
var getReadyModel = () => models.find((model) => model.status === "ready") ?? models[0];
//#endregion
//#region app/forma_app/components/CropOverlay.tsx
var CropOverlay = ({ className = "" }) => /* @__PURE__ */ jsx("div", {
	className: `absolute inset-0 flex items-center justify-center ${className}`,
	children: /* @__PURE__ */ jsxs("div", {
		className: "forma-crop-dim relative h-[280px] w-[280px] rounded-sm",
		children: [
			/* @__PURE__ */ jsx("span", { className: "forma-crop-corner forma-crop-corner-tl" }),
			/* @__PURE__ */ jsx("span", { className: "forma-crop-corner forma-crop-corner-tr" }),
			/* @__PURE__ */ jsx("span", { className: "forma-crop-corner forma-crop-corner-bl" }),
			/* @__PURE__ */ jsx("span", { className: "forma-crop-corner forma-crop-corner-br" })
		]
	})
});
//#endregion
//#region app/forma_app/components/PrimaryButton.tsx
var PrimaryButton$2 = ({ children, onClick, className = "" }) => /* @__PURE__ */ jsx("button", {
	type: "button",
	onClick,
	className: `flex h-14 w-full items-center justify-center rounded-2xl bg-[#0A0A0A] text-[15px] font-semibold text-white transition active:scale-[0.98] ${className}`,
	children
});
//#endregion
//#region app/forma_app/components/StatusBar.tsx
var StatusBar$1 = () => /* @__PURE__ */ jsxs("div", {
	className: "flex h-11 items-end justify-between px-6 pb-1",
	children: [/* @__PURE__ */ jsx("span", {
		className: "text-[13px] font-semibold text-[#0A0A0A]",
		children: "9:41"
	}), /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-1",
		children: [
			/* @__PURE__ */ jsxs("svg", {
				width: "16",
				height: "12",
				viewBox: "0 0 16 12",
				fill: "none",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ jsx("rect", {
						x: "0",
						y: "6",
						width: "3",
						height: "6",
						rx: "0.5",
						fill: "#0A0A0A"
					}),
					/* @__PURE__ */ jsx("rect", {
						x: "4.5",
						y: "4",
						width: "3",
						height: "8",
						rx: "0.5",
						fill: "#0A0A0A"
					}),
					/* @__PURE__ */ jsx("rect", {
						x: "9",
						y: "2",
						width: "3",
						height: "10",
						rx: "0.5",
						fill: "#0A0A0A"
					}),
					/* @__PURE__ */ jsx("rect", {
						x: "13.5",
						y: "0",
						width: "2.5",
						height: "12",
						rx: "0.5",
						fill: "#0A0A0A"
					})
				]
			}),
			/* @__PURE__ */ jsxs("svg", {
				width: "15",
				height: "12",
				viewBox: "0 0 15 12",
				fill: "none",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ jsx("path", {
						d: "M7.5 2.5C9.8 2.5 11.9 3.4 13.4 5L14.8 3.6C12.9 1.4 10.3 0 7.5 0C4.7 0 2.1 1.4 0.2 3.6L1.6 5C3.1 3.4 5.2 2.5 7.5 2.5Z",
						fill: "#0A0A0A"
					}),
					/* @__PURE__ */ jsx("path", {
						d: "M7.5 6.5C8.9 6.5 10.2 7 11.2 8L12.6 6.6C11.2 5.2 9.4 4.5 7.5 4.5C5.6 4.5 3.8 5.2 2.4 6.6L3.8 8C4.8 7 6.1 6.5 7.5 6.5Z",
						fill: "#0A0A0A"
					}),
					/* @__PURE__ */ jsx("circle", {
						cx: "7.5",
						cy: "10.5",
						r: "1.5",
						fill: "#0A0A0A"
					})
				]
			}),
			/* @__PURE__ */ jsxs("svg", {
				width: "25",
				height: "12",
				viewBox: "0 0 25 12",
				fill: "none",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ jsx("rect", {
						x: "0.5",
						y: "0.5",
						width: "21",
						height: "11",
						rx: "2.5",
						stroke: "#0A0A0A",
						strokeOpacity: "0.35"
					}),
					/* @__PURE__ */ jsx("rect", {
						x: "2",
						y: "2",
						width: "16",
						height: "8",
						rx: "1.5",
						fill: "#0A0A0A"
					}),
					/* @__PURE__ */ jsx("path", {
						d: "M23 4.5V7.5C23.8 7.2 24.5 6.5 24.5 6C24.5 5.5 23.8 4.8 23 4.5Z",
						fill: "#0A0A0A",
						fillOpacity: "0.4"
					})
				]
			})
		]
	})]
});
//#endregion
//#region app/forma_app/screens/CaptureScreen.tsx
var CheckItem = ({ status, text }) => /* @__PURE__ */ jsxs("div", {
	className: "flex items-center gap-3",
	children: [/* @__PURE__ */ jsx("div", {
		className: `flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${status === "ok" ? "bg-[#0A0A0A]" : "border border-[#D97706]"}`,
		children: status === "ok" ? /* @__PURE__ */ jsx("svg", {
			width: "10",
			height: "8",
			viewBox: "0 0 10 8",
			fill: "none",
			"aria-hidden": "true",
			children: /* @__PURE__ */ jsx("path", {
				d: "M1 4L3.5 6.5L9 1",
				stroke: "white",
				strokeWidth: "1.5",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			})
		}) : /* @__PURE__ */ jsx("div", { className: "h-1.5 w-1.5 rounded-full bg-[#D97706]" })
	}), /* @__PURE__ */ jsx("span", {
		className: `text-[14px] ${status === "ok" ? "text-[#737373]" : "text-[#D97706]"}`,
		children: text
	})]
});
var CaptureScreen = () => /* @__PURE__ */ jsxs("div", {
	className: "forma-screen-enter flex h-[844px] flex-col bg-white px-5",
	children: [
		/* @__PURE__ */ jsx(StatusBar$1, {}),
		/* @__PURE__ */ jsx("h1", {
			className: "pt-2 text-[28px] font-bold tracking-[-0.02em] text-[#0A0A0A]",
			children: "Сканирование"
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "forma-photo-bg relative mx-auto mt-5 h-[320px] w-full overflow-hidden rounded-2xl",
			children: [/* @__PURE__ */ jsx("div", {
				className: "absolute inset-0 flex items-end justify-center pb-8",
				children: /* @__PURE__ */ jsx("div", { className: "h-[180px] w-[120px] rounded-t-full bg-gradient-to-b from-[#C4A882] to-[#A08060] opacity-80" })
			}), /* @__PURE__ */ jsx(CropOverlay, {})]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "mt-6 space-y-3",
			children: [
				/* @__PURE__ */ jsx(CheckItem, {
					status: "ok",
					text: "Объект в центре"
				}),
				/* @__PURE__ */ jsx(CheckItem, {
					status: "ok",
					text: "Хорошее освещение"
				}),
				/* @__PURE__ */ jsx(CheckItem, {
					status: "warning",
					text: "Нужен ещё ракурс"
				})
			]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "mt-auto flex flex-col gap-3 pb-8 pt-6",
			children: [/* @__PURE__ */ jsx("button", {
				type: "button",
				className: "flex h-14 w-full items-center justify-center text-[15px] font-medium text-[#737373] transition active:opacity-70",
				children: "Переснять"
			}), /* @__PURE__ */ jsx(PrimaryButton$2, { children: "Создать модель" })]
		})
	]
});
//#endregion
//#region app/forma_app/components/ModelCard.tsx
var ProgressRing = ({ progress }) => {
	const radius = 18;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference - progress / 100 * circumference;
	return /* @__PURE__ */ jsxs("div", {
		className: "relative flex h-12 w-12 shrink-0 items-center justify-center",
		children: [/* @__PURE__ */ jsxs("svg", {
			className: "forma-progress-ring absolute h-12 w-12",
			viewBox: "0 0 44 44",
			"aria-hidden": "true",
			children: [/* @__PURE__ */ jsx("circle", {
				cx: "22",
				cy: "22",
				r: radius,
				fill: "none",
				stroke: "#E5E5E5",
				strokeWidth: "3"
			}), /* @__PURE__ */ jsx("circle", {
				cx: "22",
				cy: "22",
				r: radius,
				fill: "none",
				stroke: "#0A0A0A",
				strokeWidth: "3",
				strokeLinecap: "round",
				strokeDasharray: circumference,
				strokeDashoffset: offset,
				transform: "rotate(-90 22 22)"
			})]
		}), /* @__PURE__ */ jsxs("span", {
			className: "text-[10px] font-semibold text-[#737373]",
			children: [progress, "%"]
		})]
	});
};
var ModelCard = ({ model }) => {
	if (model.status === "loading") return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-3 rounded-2xl border border-[#E5E5E5] bg-[#FAFAFA] p-4",
		children: [
			/* @__PURE__ */ jsx("div", { className: "forma-skeleton h-12 w-12 shrink-0 rounded-xl" }),
			/* @__PURE__ */ jsxs("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ jsx("p", {
					className: "truncate text-[15px] font-medium text-[#0A0A0A]",
					children: model.name
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-0.5 text-[13px] text-[#737373]",
					children: "Генерация…"
				})]
			}),
			/* @__PURE__ */ jsx(ProgressRing, { progress: model.progress ?? 0 })
		]
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-3 rounded-2xl border border-[#E5E5E5] bg-white p-4",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "forma-thumbnail-wireframe flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
				children: /* @__PURE__ */ jsxs("svg", {
					width: "20",
					height: "20",
					viewBox: "0 0 20 20",
					fill: "none",
					"aria-hidden": "true",
					children: [/* @__PURE__ */ jsx("path", {
						d: "M10 2L18 7V13L10 18L2 13V7L10 2Z",
						stroke: "#A3A3A3",
						strokeWidth: "1.2",
						strokeLinejoin: "round"
					}), /* @__PURE__ */ jsx("path", {
						d: "M10 2V18M2 7L18 13M18 7L2 13",
						stroke: "#A3A3A3",
						strokeWidth: "1.2"
					})]
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ jsx("p", {
					className: "truncate text-[15px] font-medium text-[#0A0A0A]",
					children: model.name
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-0.5 text-[13px] text-[#737373]",
					children: model.createdAt
				})]
			}),
			/* @__PURE__ */ jsx("svg", {
				width: "8",
				height: "14",
				viewBox: "0 0 8 14",
				fill: "none",
				"aria-hidden": "true",
				children: /* @__PURE__ */ jsx("path", {
					d: "M1 1L7 7L1 13",
					stroke: "#A3A3A3",
					strokeWidth: "1.5",
					strokeLinecap: "round",
					strokeLinejoin: "round"
				})
			})
		]
	});
};
//#endregion
//#region app/forma_app/screens/LibraryScreen.tsx
var LibraryScreen = () => /* @__PURE__ */ jsxs("div", {
	className: "forma-screen-enter flex h-[844px] flex-col bg-white px-5",
	children: [
		/* @__PURE__ */ jsx(StatusBar$1, {}),
		/* @__PURE__ */ jsxs("header", {
			className: "mb-6 flex items-center justify-between pt-2",
			children: [/* @__PURE__ */ jsx("h1", {
				className: "text-[28px] font-bold tracking-[-0.02em] text-[#0A0A0A]",
				children: "Мои модели"
			}), /* @__PURE__ */ jsx("button", {
				type: "button",
				className: "flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E5E5] transition active:scale-95",
				"aria-label": "Новая модель",
				children: /* @__PURE__ */ jsx("svg", {
					width: "16",
					height: "16",
					viewBox: "0 0 16 16",
					fill: "none",
					"aria-hidden": "true",
					children: /* @__PURE__ */ jsx("path", {
						d: "M8 3V13M3 8H13",
						stroke: "#0A0A0A",
						strokeWidth: "1.5",
						strokeLinecap: "round"
					})
				})
			})]
		}),
		/* @__PURE__ */ jsx("div", {
			className: "flex flex-col gap-3",
			children: models.map((model) => /* @__PURE__ */ jsx(ModelCard, { model }, model.id))
		})
	]
});
//#endregion
//#region app/forma_app/components/SecondaryButton.tsx
var SecondaryButton$1 = ({ children, onClick, className = "" }) => /* @__PURE__ */ jsx("button", {
	type: "button",
	onClick,
	className: `flex h-14 w-full items-center justify-center rounded-2xl border border-[#E5E5E5] bg-white text-[15px] font-semibold text-[#0A0A0A] transition active:scale-[0.98] ${className}`,
	children
});
//#endregion
//#region app/forma_app/screens/PreviewScreen.tsx
var WireframeCube = () => /* @__PURE__ */ jsxs("div", {
	className: "forma-cube",
	children: [
		/* @__PURE__ */ jsx("div", { className: "forma-cube-face forma-cube-face-front" }),
		/* @__PURE__ */ jsx("div", { className: "forma-cube-face forma-cube-face-back" }),
		/* @__PURE__ */ jsx("div", { className: "forma-cube-face forma-cube-face-right" }),
		/* @__PURE__ */ jsx("div", { className: "forma-cube-face forma-cube-face-left" }),
		/* @__PURE__ */ jsx("div", { className: "forma-cube-face forma-cube-face-top" }),
		/* @__PURE__ */ jsx("div", { className: "forma-cube-face forma-cube-face-bottom" })
	]
});
var PreviewScreen = ({ model }) => /* @__PURE__ */ jsxs("div", {
	className: "forma-screen-enter flex h-[844px] flex-col bg-white",
	children: [
		/* @__PURE__ */ jsx(StatusBar$1, {}),
		/* @__PURE__ */ jsx("div", {
			className: "relative px-5 pt-1",
			children: /* @__PURE__ */ jsx("button", {
				type: "button",
				className: "flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E5E5]",
				"aria-label": "Назад",
				children: /* @__PURE__ */ jsx("svg", {
					width: "8",
					height: "14",
					viewBox: "0 0 8 14",
					fill: "none",
					"aria-hidden": "true",
					children: /* @__PURE__ */ jsx("path", {
						d: "M7 1L1 7L7 13",
						stroke: "#0A0A0A",
						strokeWidth: "1.5",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				})
			})
		}),
		/* @__PURE__ */ jsx("div", {
			className: "forma-wireframe-grid mx-5 mt-3 flex h-[380px] items-center justify-center rounded-2xl",
			children: /* @__PURE__ */ jsx(WireframeCube, {})
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "flex flex-1 flex-col justify-between px-6 pb-8 pt-6",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
				className: "text-[28px] font-bold tracking-[-0.02em] text-[#0A0A0A]",
				children: model.name
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-3 text-[15px] leading-relaxed text-[#737373]",
				children: model.description
			})] }), /* @__PURE__ */ jsxs("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ jsx(PrimaryButton$2, { children: "Скачать GLB" }), /* @__PURE__ */ jsx(SecondaryButton$1, { children: "Поделиться" })]
			})]
		})
	]
});
//#endregion
//#region app/forma_app/screens/WelcomeScreen.tsx
var FeatureItem = ({ icon, text }) => /* @__PURE__ */ jsxs("div", {
	className: "flex items-center gap-4",
	children: [/* @__PURE__ */ jsx("div", {
		className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E5E5E5]",
		children: icon
	}), /* @__PURE__ */ jsx("span", {
		className: "text-[15px] text-[#737373]",
		children: text
	})]
});
var WelcomeScreen = () => /* @__PURE__ */ jsxs("div", {
	className: "forma-screen-enter flex h-[844px] flex-col bg-white px-6",
	children: [/* @__PURE__ */ jsx(StatusBar$1, {}), /* @__PURE__ */ jsxs("div", {
		className: "flex flex-1 flex-col justify-between pb-10 pt-8",
		children: [
			/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx("p", {
					className: "text-[13px] font-medium uppercase tracking-[0.2em] text-[#737373]",
					children: "Forma"
				}),
				/* @__PURE__ */ jsxs("h1", {
					className: "mt-10 text-[36px] font-bold leading-[1.1] tracking-[-0.02em] text-[#0A0A0A]",
					children: [
						"Фото → 3D",
						/* @__PURE__ */ jsx("br", {}),
						"за минуты"
					]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-4 max-w-[280px] text-[15px] leading-relaxed text-[#737373]",
					children: "Нейросеть строит GLB-модель из нескольких ракурсов вашего объекта"
				})
			] }),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-5",
				children: [
					/* @__PURE__ */ jsx(FeatureItem, {
						icon: /* @__PURE__ */ jsxs("svg", {
							width: "18",
							height: "18",
							viewBox: "0 0 18 18",
							fill: "none",
							"aria-hidden": "true",
							children: [/* @__PURE__ */ jsx("rect", {
								x: "2",
								y: "4",
								width: "14",
								height: "11",
								rx: "2",
								stroke: "#0A0A0A",
								strokeWidth: "1.2"
							}), /* @__PURE__ */ jsx("circle", {
								cx: "9",
								cy: "9.5",
								r: "2.5",
								stroke: "#0A0A0A",
								strokeWidth: "1.2"
							})]
						}),
						text: "Сканируй объект"
					}),
					/* @__PURE__ */ jsx(FeatureItem, {
						icon: /* @__PURE__ */ jsxs("svg", {
							width: "18",
							height: "18",
							viewBox: "0 0 18 18",
							fill: "none",
							"aria-hidden": "true",
							children: [/* @__PURE__ */ jsx("path", {
								d: "M3 14L9 4L15 14H3Z",
								stroke: "#0A0A0A",
								strokeWidth: "1.2",
								strokeLinejoin: "round"
							}), /* @__PURE__ */ jsx("path", {
								d: "M3 14H15",
								stroke: "#0A0A0A",
								strokeWidth: "1.2"
							})]
						}),
						text: "Получи GLB"
					}),
					/* @__PURE__ */ jsx(FeatureItem, {
						icon: /* @__PURE__ */ jsxs("svg", {
							width: "18",
							height: "18",
							viewBox: "0 0 18 18",
							fill: "none",
							"aria-hidden": "true",
							children: [/* @__PURE__ */ jsx("path", {
								d: "M13 10V14C13 14.55 12.55 15 12 15H4C3.45 15 3 14.55 3 14V6C3 5.45 3.45 5 4 5H8",
								stroke: "#0A0A0A",
								strokeWidth: "1.2",
								strokeLinecap: "round"
							}), /* @__PURE__ */ jsx("path", {
								d: "M11 3H15V7M15 3L7 11",
								stroke: "#0A0A0A",
								strokeWidth: "1.2",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							})]
						}),
						text: "Делись моделью"
					})
				]
			}),
			/* @__PURE__ */ jsx(PrimaryButton$2, { children: "Начать" })
		]
	})]
});
//#endregion
//#region app/forma_app/frame.tsx
var FormaFrame = () => {
	const previewModel = getReadyModel();
	return /* @__PURE__ */ jsxs("div", {
		className: "forma-root forma-showcase grid grid-cols-2 gap-10",
		children: [
			/* @__PURE__ */ jsx(PhoneFrame, {
				label: "Вход",
				children: /* @__PURE__ */ jsx(WelcomeScreen, {})
			}),
			/* @__PURE__ */ jsx(PhoneFrame, {
				label: "Мои модели",
				children: /* @__PURE__ */ jsx(LibraryScreen, {})
			}),
			/* @__PURE__ */ jsx(PhoneFrame, {
				label: "Превью",
				children: /* @__PURE__ */ jsx(PreviewScreen, { model: previewModel })
			}),
			/* @__PURE__ */ jsx(PhoneFrame, {
				label: "Сканирование",
				children: /* @__PURE__ */ jsx(CaptureScreen, {})
			})
		]
	});
};
//#endregion
//#region app/pay_app/components/ActionTile.tsx
var ActionTile = ({ icon, label, hint }) => /* @__PURE__ */ jsxs("button", {
	type: "button",
	className: "pay-action-tile",
	children: [
		/* @__PURE__ */ jsx("span", {
			className: "pay-action-tile__icon",
			children: icon
		}),
		/* @__PURE__ */ jsx("span", {
			className: "pay-action-tile__label",
			children: label
		}),
		hint && /* @__PURE__ */ jsx("span", {
			className: "pay-action-tile__hint",
			children: hint
		})
	]
});
//#endregion
//#region app/pay_app/components/icons.tsx
var IconArrowLeft = ({ size = 20 }) => /* @__PURE__ */ jsx("svg", {
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	children: /* @__PURE__ */ jsx("path", { d: "M19 12H5M12 19l-7-7 7-7" })
});
var IconTransfer = ({ size = 22 }) => /* @__PURE__ */ jsx("svg", {
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.8",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	children: /* @__PURE__ */ jsx("path", { d: "M7 17l-4-4 4-4M3 13h12M17 7l4 4-4 4M21 11H9" })
});
var IconBalance = ({ size = 22 }) => /* @__PURE__ */ jsxs("svg", {
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.8",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	children: [/* @__PURE__ */ jsx("rect", {
		x: "2",
		y: "5",
		width: "20",
		height: "14",
		rx: "2"
	}), /* @__PURE__ */ jsx("path", { d: "M2 10h20M6 15h2M10 15h4" })]
});
var IconInternal = ({ size = 22 }) => /* @__PURE__ */ jsxs("svg", {
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.8",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	children: [/* @__PURE__ */ jsx("path", { d: "M8 3H5a2 2 0 00-2 2v3M16 3h3a2 2 0 012 2v3M8 21H5a2 2 0 01-2-2v-3M16 21h3a2 2 0 002-2v-3" }), /* @__PURE__ */ jsx("path", { d: "M12 8v8M9 11l3-3 3 3M9 13l3 3 3-3" })]
});
var IconMobile = ({ size = 22 }) => /* @__PURE__ */ jsxs("svg", {
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.8",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	children: [/* @__PURE__ */ jsx("rect", {
		x: "5",
		y: "2",
		width: "14",
		height: "20",
		rx: "2"
	}), /* @__PURE__ */ jsx("path", { d: "M12 18h.01" })]
});
var IconContacts = ({ size = 18 }) => /* @__PURE__ */ jsx("svg", {
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	children: /* @__PURE__ */ jsx("path", { d: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" })
});
var IconChevronRight = ({ size = 16 }) => /* @__PURE__ */ jsx("svg", {
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	children: /* @__PURE__ */ jsx("path", { d: "M9 18l6-6-6-6" })
});
var IconSignal = ({ size = 14 }) => /* @__PURE__ */ jsxs("svg", {
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "currentColor",
	children: [
		/* @__PURE__ */ jsx("rect", {
			x: "1",
			y: "14",
			width: "4",
			height: "8",
			rx: "1"
		}),
		/* @__PURE__ */ jsx("rect", {
			x: "7",
			y: "10",
			width: "4",
			height: "12",
			rx: "1"
		}),
		/* @__PURE__ */ jsx("rect", {
			x: "13",
			y: "6",
			width: "4",
			height: "16",
			rx: "1"
		}),
		/* @__PURE__ */ jsx("rect", {
			x: "19",
			y: "2",
			width: "4",
			height: "20",
			rx: "1",
			opacity: "0.3"
		})
	]
});
var IconBattery = ({ size = 22 }) => /* @__PURE__ */ jsxs("svg", {
	width: size,
	height: size,
	viewBox: "0 0 28 14",
	fill: "none",
	children: [
		/* @__PURE__ */ jsx("rect", {
			x: "0.5",
			y: "0.5",
			width: "23",
			height: "13",
			rx: "3",
			stroke: "currentColor",
			strokeWidth: "1"
		}),
		/* @__PURE__ */ jsx("rect", {
			x: "2",
			y: "2",
			width: "17",
			height: "10",
			rx: "2",
			fill: "currentColor"
		}),
		/* @__PURE__ */ jsx("path", {
			d: "M25 4.5v5a1.5 1.5 0 000-5z",
			fill: "currentColor"
		})
	]
});
var IconPlus$1 = ({ size = 20 }) => /* @__PURE__ */ jsx("svg", {
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	children: /* @__PURE__ */ jsx("path", { d: "M12 5v14M5 12h14" })
});
var IconSearch = ({ size = 18 }) => /* @__PURE__ */ jsxs("svg", {
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	children: [/* @__PURE__ */ jsx("circle", {
		cx: "11",
		cy: "11",
		r: "8"
	}), /* @__PURE__ */ jsx("path", { d: "M21 21l-4.35-4.35" })]
});
var IconChevronDown$1 = ({ size = 16 }) => /* @__PURE__ */ jsx("svg", {
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	children: /* @__PURE__ */ jsx("path", { d: "M6 9l6 6 6-6" })
});
var IconCard = ({ size = 20 }) => /* @__PURE__ */ jsxs("svg", {
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.8",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	children: [/* @__PURE__ */ jsx("rect", {
		x: "2",
		y: "5",
		width: "20",
		height: "14",
		rx: "2"
	}), /* @__PURE__ */ jsx("path", { d: "M2 10h20" })]
});
//#endregion
//#region app/pay_app/data/banks.ts
var normalizePhone = (phone) => {
	const digits = phone.replace(/\D/g, "");
	if (digits.length === 11 && (digits.startsWith("7") || digits.startsWith("8"))) return digits.slice(1);
	return digits;
};
var formatPhoneDisplay = (phone) => {
	const normalized = normalizePhone(phone);
	if (normalized.length !== 10) return phone;
	return `+7 (${normalized.slice(0, 3)}) ${normalized.slice(3, 6)}-${normalized.slice(6, 8)}-${normalized.slice(8)}`;
};
var buildSberSms = ({ phone, amount, cardLast4 }) => {
	const normalized = normalizePhone(phone);
	const parts = ["ПЕРЕВОД"];
	if (cardLast4) parts.push(cardLast4);
	parts.push(normalized, String(Math.round(amount)));
	return parts.join(" ");
};
var buildTbankSms = ({ phone, amount }) => `pay ${normalizePhone(phone)} ${Math.round(amount)}`;
var buildVtbSms = ({ phone, amount }) => `p1 ${normalizePhone(phone)} ${Math.round(amount)}`;
var buildAlfaSms = ({ phone, amount }) => `перевод ${normalizePhone(phone)} ${Math.round(amount)}`;
var buildGazpromSms = ({ phone, amount }) => `ПЕРЕВОД ${normalizePhone(phone)} ${Math.round(amount)}`;
var banks = [
	{
		id: "sber",
		name: "Сбербанк",
		shortName: "Сбер",
		initials: "СБ",
		accent: "#21A038",
		glowColor: "rgba(33, 160, 56, 0.2)",
		smsNumber: "900",
		buildSmsText: buildSberSms
	},
	{
		id: "tbank",
		name: "Т-Банк",
		shortName: "Т-Банк",
		initials: "Т",
		accent: "#FFDD2D",
		glowColor: "rgba(255, 221, 45, 0.22)",
		smsNumber: "2273",
		buildSmsText: buildTbankSms
	},
	{
		id: "vtb",
		name: "ВТБ",
		shortName: "ВТБ",
		initials: "ВТ",
		accent: "#009FDF",
		glowColor: "rgba(0, 159, 223, 0.18)",
		smsNumber: "1611",
		buildSmsText: buildVtbSms
	},
	{
		id: "alfa",
		name: "Альфа-Банк",
		shortName: "Альфа",
		initials: "А",
		accent: "#EF3124",
		glowColor: "rgba(239, 49, 36, 0.16)",
		smsNumber: "2265",
		buildSmsText: buildAlfaSms
	},
	{
		id: "gazprom",
		name: "Газпромбанк",
		shortName: "Газпром",
		initials: "ГП",
		accent: "#003882",
		glowColor: "rgba(0, 56, 130, 0.16)",
		smsNumber: "900",
		buildSmsText: buildGazpromSms
	},
	{
		id: "raiffeisen",
		name: "Райффайзен",
		shortName: "Райфф",
		initials: "РФ",
		accent: "#FEE600",
		glowColor: "rgba(254, 230, 0, 0.2)",
		smsNumber: "2265",
		buildSmsText: buildAlfaSms
	}
];
var getBankById = (id) => banks.find((bank) => bank.id === id) ?? banks[0];
//#endregion
//#region app/pay_app/components/BankSelector.tsx
var BankSelector = ({ activeBankId = "sber" }) => {
	const bank = getBankById(activeBankId);
	return /* @__PURE__ */ jsxs("div", {
		className: "pay-bank-scroll pay-hide-scrollbar",
		children: [/* @__PURE__ */ jsxs("button", {
			type: "button",
			className: "pay-bank-chip pay-bank-chip--active",
			style: { "--pay-bank-accent": bank.accent },
			children: [/* @__PURE__ */ jsx("span", {
				className: "pay-bank-chip__avatar",
				style: { background: bank.accent },
				children: bank.initials
			}), bank.shortName]
		}), /* @__PURE__ */ jsx("button", {
			type: "button",
			className: "pay-bank-chip pay-bank-chip--add",
			"aria-label": "Добавить банк",
			children: /* @__PURE__ */ jsx("span", {
				className: "pay-bank-chip__avatar pay-bank-chip__avatar--add",
				children: /* @__PURE__ */ jsx(IconPlus$1, { size: 16 })
			})
		})]
	});
};
//#endregion
//#region app/pay_app/data/cards.ts
var paymentCards = [
	{
		id: "card-1",
		label: "Основная",
		last4: "4276",
		balance: 42580,
		type: "debit"
	},
	{
		id: "card-2",
		label: "Зарплатная",
		last4: "8912",
		balance: 128400,
		type: "debit"
	},
	{
		id: "card-3",
		label: "Кредитная",
		last4: "3301",
		balance: 85e3,
		type: "credit"
	}
];
var getCardById = (id) => paymentCards.find((card) => card.id === id);
var formatCardBalance = (balance) => new Intl.NumberFormat("ru-RU", {
	style: "currency",
	currency: "RUB",
	maximumFractionDigits: 0
}).format(balance);
//#endregion
//#region app/pay_app/components/CardCarousel.tsx
var CardCarousel = ({ activeCardId = "card-1" }) => /* @__PURE__ */ jsx("div", {
	className: "pay-cards",
	children: /* @__PURE__ */ jsxs("div", {
		className: "pay-cards__scroll pay-hide-scrollbar",
		children: [paymentCards.map((card) => /* @__PURE__ */ jsxs("button", {
			type: "button",
			className: `pay-card ${card.id === activeCardId ? "pay-card--active" : ""}`,
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "pay-card__top",
					children: [/* @__PURE__ */ jsx("span", {
						className: "pay-card__label",
						children: card.label
					}), /* @__PURE__ */ jsx("span", {
						className: "pay-card__type",
						children: card.type === "credit" ? "Кредитная" : "Дебетовая"
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "pay-card__balance",
					children: formatCardBalance(card.balance)
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "pay-card__number",
					children: ["•••• ", card.last4]
				})
			]
		}, card.id)), /* @__PURE__ */ jsxs("button", {
			type: "button",
			className: "pay-card pay-card--add",
			children: [
				/* @__PURE__ */ jsx("span", {
					className: "pay-card-add__icon",
					children: /* @__PURE__ */ jsx(IconPlus$1, { size: 24 })
				}),
				/* @__PURE__ */ jsx("span", {
					className: "pay-card-add__label",
					children: "Добавить карту"
				}),
				/* @__PURE__ */ jsx("span", {
					className: "pay-card-add__hint",
					children: "Последние 4 цифры для SMS"
				})
			]
		})]
	})
});
//#endregion
//#region app/pay_app/components/BankBackground.tsx
var withAlpha = (hex, alpha) => {
	const value = hex.replace("#", "");
	return `rgba(${parseInt(value.slice(0, 2), 16)}, ${parseInt(value.slice(2, 4), 16)}, ${parseInt(value.slice(4, 6), 16)}, ${alpha})`;
};
var BankBackground = ({ bank }) => /* @__PURE__ */ jsxs("div", {
	className: "pay-bg",
	children: [/* @__PURE__ */ jsx("div", {
		className: "pay-bg__orb",
		style: { background: `radial-gradient(circle, ${withAlpha(bank.accent, .55)} 0%, ${withAlpha(bank.accent, .28)} 42%, transparent 70%)` }
	}), /* @__PURE__ */ jsx("div", {
		className: "pay-bg__glow pay-bg__glow--bottom",
		style: { background: `radial-gradient(ellipse 90% 55% at 50% 115%, ${bank.glowColor} 0%, transparent 72%)` }
	})]
});
//#endregion
//#region app/pay_app/components/ScreenShell.tsx
var ScreenShell$1 = ({ bank, children, overlay, showStatusBar = true }) => /* @__PURE__ */ jsxs("div", {
	className: "pay-screen pay-screen-enter",
	style: { "--pay-bank-accent": bank.accent },
	children: [/* @__PURE__ */ jsx(BankBackground, { bank }), /* @__PURE__ */ jsxs("div", {
		className: "pay-screen__content",
		children: [
			showStatusBar && /* @__PURE__ */ jsxs("div", {
				className: "pay-status-bar",
				children: [/* @__PURE__ */ jsx("span", {
					className: "pay-status-bar__time",
					children: "9:41"
				}), /* @__PURE__ */ jsxs("div", {
					className: "pay-status-bar__icons",
					children: [/* @__PURE__ */ jsx(IconSignal, {}), /* @__PURE__ */ jsx(IconBattery, {})]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "pay-scroll pay-hide-scrollbar",
				children
			}),
			overlay
		]
	})]
});
//#endregion
//#region app/pay_app/screens/HomeScreen.tsx
var HomeScreen = ({ defaultBankId = "sber", activeCardId = "card-1" }) => {
	return /* @__PURE__ */ jsxs(ScreenShell$1, {
		bank: getBankById(defaultBankId),
		children: [
			/* @__PURE__ */ jsx(BankSelector, { activeBankId: defaultBankId }),
			/* @__PURE__ */ jsx(CardCarousel, { activeCardId }),
			/* @__PURE__ */ jsx("h1", {
				className: "pay-section-title",
				children: "Платежи"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "pay-action-grid",
				children: [
					/* @__PURE__ */ jsx(ActionTile, {
						icon: /* @__PURE__ */ jsx(IconTransfer, {}),
						label: "Перевести",
						hint: "По номеру телефона через SMS"
					}),
					/* @__PURE__ */ jsx(ActionTile, {
						icon: /* @__PURE__ */ jsx(IconBalance, {}),
						label: "Узнать баланс",
						hint: "Запрос SMS на короткий номер"
					}),
					/* @__PURE__ */ jsx(ActionTile, {
						icon: /* @__PURE__ */ jsx(IconInternal, {}),
						label: "Между счетами",
						hint: "Перевод между своими картами"
					}),
					/* @__PURE__ */ jsx(ActionTile, {
						icon: /* @__PURE__ */ jsx(IconMobile, {}),
						label: "Пополнить телефон",
						hint: "Мобильная связь"
					})
				]
			})
		]
	});
};
//#endregion
//#region app/pay_app/components/BackButton.tsx
var BackButton = ({ label = "Назад" }) => /* @__PURE__ */ jsx("button", {
	type: "button",
	className: "pay-btn-back",
	"aria-label": label,
	children: /* @__PURE__ */ jsx(IconArrowLeft, {})
});
//#endregion
//#region app/pay_app/components/AmountInput.tsx
var AmountInput = ({ value, label = "Сумма перевода", placeholder = "0 ₽", readOnly = false }) => /* @__PURE__ */ jsxs("div", {
	className: "pay-field",
	children: [/* @__PURE__ */ jsx("label", {
		className: "pay-field__label",
		children: label
	}), /* @__PURE__ */ jsx("input", {
		type: "text",
		inputMode: "numeric",
		className: "pay-field__input",
		value,
		placeholder,
		readOnly
	})]
});
//#endregion
//#region app/pay_app/components/PrimaryButton.tsx
var PrimaryButton$1 = ({ children, href }) => {
	if (href) return /* @__PURE__ */ jsx("a", {
		href,
		className: "pay-btn-primary",
		style: {
			display: "block",
			textAlign: "center",
			textDecoration: "none"
		},
		children
	});
	return /* @__PURE__ */ jsx("button", {
		type: "button",
		className: "pay-btn-primary",
		children
	});
};
//#endregion
//#region app/pay_app/screens/InternalTransferScreen.tsx
var InternalTransferScreen = ({ defaultBankId = "sber" }) => {
	return /* @__PURE__ */ jsxs(ScreenShell$1, {
		bank: getBankById(defaultBankId),
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "pay-header",
				children: [/* @__PURE__ */ jsx(BackButton, {}), /* @__PURE__ */ jsx("span", {
					className: "pay-header__title",
					children: "Между счетами"
				})]
			}),
			/* @__PURE__ */ jsx(BankSelector, { activeBankId: defaultBankId }),
			/* @__PURE__ */ jsxs("div", {
				className: "pay-glass-solid pay-stub-card",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "pay-select-row",
					children: [/* @__PURE__ */ jsx("span", {
						className: "pay-select-row__label",
						children: "Со счёта"
					}), /* @__PURE__ */ jsxs("span", {
						className: "pay-select-row__value",
						children: ["•••• 4276", /* @__PURE__ */ jsx(IconChevronRight, {})]
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "pay-select-row",
					children: [/* @__PURE__ */ jsx("span", {
						className: "pay-select-row__label",
						children: "На счёт"
					}), /* @__PURE__ */ jsxs("span", {
						className: "pay-select-row__value",
						children: ["•••• 8912", /* @__PURE__ */ jsx(IconChevronRight, {})]
					})]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "pay-form-stack",
				children: /* @__PURE__ */ jsx(AmountInput, {
					value: "5 000 ₽",
					readOnly: true
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "pay-glass-solid pay-stub-card",
				children: /* @__PURE__ */ jsx("div", {
					className: "pay-stub-card__desc",
					children: "Комиссия не взимается · перевод моментальный"
				})
			}),
			/* @__PURE__ */ jsx("div", {
				style: { padding: "0 16px 24px" },
				children: /* @__PURE__ */ jsx(PrimaryButton$1, { children: "Перевести" })
			})
		]
	});
};
//#endregion
//#region app/pay_app/components/PhoneInput.tsx
var PhoneInput = ({ value, label = "Номер получателя", placeholder = "+7 (___) ___-__-__", readOnly = false }) => /* @__PURE__ */ jsxs("div", {
	className: "pay-field",
	children: [/* @__PURE__ */ jsx("label", {
		className: "pay-field__label",
		children: label
	}), /* @__PURE__ */ jsx("input", {
		type: "tel",
		className: "pay-field__input pay-field__input--phone",
		value,
		placeholder,
		readOnly
	})]
});
//#endregion
//#region app/pay_app/screens/MobileTopUpScreen.tsx
var operators = [
	"МТС",
	"Билайн",
	"МегаФон",
	"Tele2"
];
var MobileTopUpScreen = ({ defaultBankId = "sber" }) => {
	return /* @__PURE__ */ jsxs(ScreenShell$1, {
		bank: getBankById(defaultBankId),
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "pay-header",
				children: [/* @__PURE__ */ jsx(BackButton, {}), /* @__PURE__ */ jsx("span", {
					className: "pay-header__title",
					children: "Пополнить телефон"
				})]
			}),
			/* @__PURE__ */ jsx(BankSelector, { activeBankId: defaultBankId }),
			/* @__PURE__ */ jsxs("div", {
				style: { padding: "0 16px 14px" },
				children: [/* @__PURE__ */ jsx("div", {
					className: "pay-field__label",
					children: "Оператор"
				}), /* @__PURE__ */ jsx("div", {
					className: "pay-operator-grid",
					children: operators.map((operator, index) => /* @__PURE__ */ jsx("button", {
						type: "button",
						className: `pay-operator-chip ${index === 0 ? "pay-operator-chip--active" : ""}`,
						children: operator
					}, operator))
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "pay-form-stack",
				children: [/* @__PURE__ */ jsx(PhoneInput, {
					value: "+7 (916) 555-12-34",
					label: "Номер телефона",
					readOnly: true
				}), /* @__PURE__ */ jsx(AmountInput, {
					value: "300 ₽",
					label: "Сумма пополнения",
					readOnly: true
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "pay-glass-solid pay-stub-card",
				children: /* @__PURE__ */ jsx("div", {
					className: "pay-stub-card__desc",
					children: "Списание с карты •••• 4276 · без комиссии"
				})
			}),
			/* @__PURE__ */ jsx("div", {
				style: { padding: "0 16px 24px" },
				children: /* @__PURE__ */ jsx(PrimaryButton$1, { children: "Пополнить" })
			})
		]
	});
};
//#endregion
//#region app/pay_app/data/contacts.ts
var contacts = [
	{
		id: "1",
		name: "Анна Петрова",
		phone: "+7 (916) 234-56-78"
	},
	{
		id: "2",
		name: "Дмитрий Козлов",
		phone: "+7 (903) 111-22-33"
	},
	{
		id: "3",
		name: "Елена Смирнова",
		phone: "+7 (925) 987-65-43"
	},
	{
		id: "4",
		name: "Иван Морозов",
		phone: "+7 (915) 456-78-90"
	},
	{
		id: "5",
		name: "Мария Волкова",
		phone: "+7 (926) 333-44-55"
	},
	{
		id: "6",
		name: "Сергей Новиков",
		phone: "+7 (917) 777-88-99"
	},
	{
		id: "7",
		name: "Ольга Кузнецова",
		phone: "+7 (903) 222-33-44"
	},
	{
		id: "8",
		name: "Алексей Фёдоров",
		phone: "+7 (916) 555-66-77"
	}
];
var getContactInitials = (name) => name.split(" ").slice(0, 2).map((part) => part[0]).join("");
//#endregion
//#region app/pay_app/components/ContactBottomSheet.tsx
var ContactBottomSheet = ({ open = false, selectedId, searchQuery = "" }) => {
	if (!open) return null;
	const query = searchQuery.toLowerCase();
	const filtered = contacts.filter((contact) => contact.name.toLowerCase().includes(query) || contact.phone.replace(/\D/g, "").includes(query.replace(/\D/g, "")));
	return /* @__PURE__ */ jsxs("div", {
		className: "pay-sheet-overlay",
		children: [/* @__PURE__ */ jsx("div", { className: "pay-sheet-backdrop" }), /* @__PURE__ */ jsxs("div", {
			className: "pay-sheet",
			children: [
				/* @__PURE__ */ jsx("div", { className: "pay-sheet__handle" }),
				/* @__PURE__ */ jsx("div", {
					className: "pay-sheet__header",
					children: /* @__PURE__ */ jsx("h2", {
						className: "pay-sheet__title",
						children: "Контакты"
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "pay-sheet__search",
					children: [/* @__PURE__ */ jsx(IconSearch, {}), /* @__PURE__ */ jsx("input", {
						type: "search",
						className: "pay-sheet__search-input",
						placeholder: "Поиск по имени или номеру",
						value: searchQuery,
						readOnly: true
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "pay-sheet__list pay-hide-scrollbar",
					children: filtered.map((contact) => /* @__PURE__ */ jsxs("button", {
						type: "button",
						className: `pay-contact-item ${contact.id === selectedId ? "pay-contact-item--selected" : ""}`,
						children: [/* @__PURE__ */ jsx("span", {
							className: "pay-contact-item__avatar",
							children: getContactInitials(contact.name)
						}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
							className: "pay-contact-item__name",
							children: contact.name
						}), /* @__PURE__ */ jsx("div", {
							className: "pay-contact-item__phone",
							children: formatPhoneDisplay(contact.phone)
						})] })]
					}, contact.id))
				})
			]
		})]
	});
};
var ContactPickerButton = () => /* @__PURE__ */ jsxs("button", {
	type: "button",
	className: "pay-btn-contacts",
	children: [/* @__PURE__ */ jsx(IconContacts, { size: 20 }), "Выбрать из контактов"]
});
//#endregion
//#region app/pay_app/components/SecondaryButton.tsx
var SecondaryButton = ({ children }) => /* @__PURE__ */ jsx("button", {
	type: "button",
	className: "pay-btn-secondary",
	children
});
//#endregion
//#region app/pay_app/components/SourceAccountBar.tsx
var SourceAccountBar = ({ cardId = "card-1" }) => {
	const card = getCardById(cardId) ?? paymentCards[0];
	return /* @__PURE__ */ jsxs("button", {
		type: "button",
		className: "pay-source-account",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "pay-source-account__icon",
				children: /* @__PURE__ */ jsx(IconCard, {})
			}),
			/* @__PURE__ */ jsxs("span", {
				className: "pay-source-account__body",
				children: [/* @__PURE__ */ jsx("span", {
					className: "pay-source-account__label",
					children: "Со счёта"
				}), /* @__PURE__ */ jsxs("span", {
					className: "pay-source-account__value",
					children: [
						card.label,
						" · •••• ",
						card.last4
					]
				})]
			}),
			/* @__PURE__ */ jsx("span", {
				className: "pay-source-account__balance",
				children: formatCardBalance(card.balance)
			}),
			/* @__PURE__ */ jsx(IconChevronDown$1, {})
		]
	});
};
//#endregion
//#region app/pay_app/components/TransferForm.tsx
var TransferForm = ({ data, showContactButton = false, readOnly = false }) => /* @__PURE__ */ jsxs("div", {
	className: "pay-form-stack",
	children: [
		/* @__PURE__ */ jsx(PhoneInput, {
			value: data.phone,
			readOnly
		}),
		showContactButton && /* @__PURE__ */ jsx(ContactPickerButton, {}),
		/* @__PURE__ */ jsx(AmountInput, {
			value: data.amount,
			readOnly
		})
	]
});
//#endregion
//#region app/pay_app/screens/TransferScreen.tsx
var TransferScreen = ({ defaultBankId = "sber", activeCardId = "card-1", contactSheetOpen = false, contactSearchQuery = "" }) => {
	return /* @__PURE__ */ jsxs(ScreenShell$1, {
		bank: getBankById(defaultBankId),
		overlay: /* @__PURE__ */ jsx(ContactBottomSheet, {
			open: contactSheetOpen,
			searchQuery: contactSearchQuery
		}),
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "pay-header",
				children: [/* @__PURE__ */ jsx(BackButton, {}), /* @__PURE__ */ jsx("span", {
					className: "pay-header__title",
					children: "Перевод"
				})]
			}),
			/* @__PURE__ */ jsx(BankSelector, { activeBankId: defaultBankId }),
			/* @__PURE__ */ jsx("div", {
				className: "pay-form-stack",
				style: { paddingBottom: 0 },
				children: /* @__PURE__ */ jsx(SourceAccountBar, { cardId: activeCardId })
			}),
			/* @__PURE__ */ jsx(TransferForm, {
				data: {
					phone: contactSheetOpen ? "" : "+7 (916) 234-56-78",
					amount: "1 500 ₽"
				},
				showContactButton: true
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "pay-btn-stack",
				children: [/* @__PURE__ */ jsx(PrimaryButton$1, { children: "Сформировать SMS" }), /* @__PURE__ */ jsx(SecondaryButton, { children: "Скопировать SMS" })]
			})
		]
	});
};
//#endregion
//#region app/pay_app/frame.tsx
var PayFrame = () => /* @__PURE__ */ jsxs("div", {
	className: "pay-root pay-showcase grid grid-cols-2 gap-10",
	children: [
		/* @__PURE__ */ jsx(PhoneFrame, {
			label: "Главная",
			children: /* @__PURE__ */ jsx(HomeScreen, {})
		}),
		/* @__PURE__ */ jsx(PhoneFrame, {
			label: "Перевод",
			children: /* @__PURE__ */ jsx(TransferScreen, {})
		}),
		/* @__PURE__ */ jsx(PhoneFrame, {
			label: "Контакты",
			children: /* @__PURE__ */ jsx(TransferScreen, {
				contactSheetOpen: true,
				contactSearchQuery: "Анна"
			})
		}),
		/* @__PURE__ */ jsx(PhoneFrame, {
			label: "Между счетами",
			children: /* @__PURE__ */ jsx(InternalTransferScreen, {})
		}),
		/* @__PURE__ */ jsx(PhoneFrame, {
			label: "Пополнить телефон",
			children: /* @__PURE__ */ jsx(MobileTopUpScreen, {})
		})
	]
});
//#endregion
//#region app/vault_app/components/icons.tsx
var IconPlus = () => /* @__PURE__ */ jsx("svg", {
	width: "18",
	height: "18",
	viewBox: "0 0 18 18",
	fill: "none",
	"aria-hidden": "true",
	children: /* @__PURE__ */ jsx("path", {
		d: "M9 3.5V14.5M3.5 9H14.5",
		stroke: "currentColor",
		strokeWidth: "1.6",
		strokeLinecap: "round"
	})
});
var IconChevronLeft = () => /* @__PURE__ */ jsx("svg", {
	width: "22",
	height: "22",
	viewBox: "0 0 22 22",
	fill: "none",
	"aria-hidden": "true",
	children: /* @__PURE__ */ jsx("path", {
		d: "M13.5 5.5L8 11L13.5 16.5",
		stroke: "currentColor",
		strokeWidth: "1.6",
		strokeLinecap: "round",
		strokeLinejoin: "round"
	})
});
var IconChevronDown = () => /* @__PURE__ */ jsx("svg", {
	width: "16",
	height: "16",
	viewBox: "0 0 16 16",
	fill: "none",
	"aria-hidden": "true",
	children: /* @__PURE__ */ jsx("path", {
		d: "M4 6L8 10L12 6",
		stroke: "currentColor",
		strokeWidth: "1.4",
		strokeLinecap: "round",
		strokeLinejoin: "round"
	})
});
var IconMore = () => /* @__PURE__ */ jsxs("svg", {
	width: "20",
	height: "20",
	viewBox: "0 0 20 20",
	fill: "none",
	"aria-hidden": "true",
	children: [
		/* @__PURE__ */ jsx("circle", {
			cx: "10",
			cy: "5",
			r: "1.2",
			fill: "currentColor"
		}),
		/* @__PURE__ */ jsx("circle", {
			cx: "10",
			cy: "10",
			r: "1.2",
			fill: "currentColor"
		}),
		/* @__PURE__ */ jsx("circle", {
			cx: "10",
			cy: "15",
			r: "1.2",
			fill: "currentColor"
		})
	]
});
var IconSort = () => /* @__PURE__ */ jsx("svg", {
	width: "18",
	height: "18",
	viewBox: "0 0 18 18",
	fill: "none",
	"aria-hidden": "true",
	children: /* @__PURE__ */ jsx("path", {
		d: "M3 5H15M5.5 9H12.5M7.5 13H10.5",
		stroke: "currentColor",
		strokeWidth: "1.3",
		strokeLinecap: "round"
	})
});
var IconListView = () => /* @__PURE__ */ jsx("svg", {
	width: "18",
	height: "18",
	viewBox: "0 0 18 18",
	fill: "none",
	"aria-hidden": "true",
	children: /* @__PURE__ */ jsx("path", {
		d: "M3 4.5H15M3 9H15M3 13.5H15",
		stroke: "currentColor",
		strokeWidth: "1.3",
		strokeLinecap: "round"
	})
});
var IconGridView = () => /* @__PURE__ */ jsxs("svg", {
	width: "18",
	height: "18",
	viewBox: "0 0 18 18",
	fill: "none",
	"aria-hidden": "true",
	children: [
		/* @__PURE__ */ jsx("rect", {
			x: "3",
			y: "3",
			width: "5",
			height: "5",
			rx: "1",
			stroke: "currentColor",
			strokeWidth: "1.3"
		}),
		/* @__PURE__ */ jsx("rect", {
			x: "10",
			y: "3",
			width: "5",
			height: "5",
			rx: "1",
			stroke: "currentColor",
			strokeWidth: "1.3"
		}),
		/* @__PURE__ */ jsx("rect", {
			x: "3",
			y: "10",
			width: "5",
			height: "5",
			rx: "1",
			stroke: "currentColor",
			strokeWidth: "1.3"
		}),
		/* @__PURE__ */ jsx("rect", {
			x: "10",
			y: "10",
			width: "5",
			height: "5",
			rx: "1",
			stroke: "currentColor",
			strokeWidth: "1.3"
		})
	]
});
var IconFolder = () => /* @__PURE__ */ jsx("svg", {
	width: "22",
	height: "22",
	viewBox: "0 0 22 22",
	fill: "none",
	"aria-hidden": "true",
	children: /* @__PURE__ */ jsx("path", {
		d: "M3.5 6.5C3.5 5.67 4.17 5 5 5H8.5L10 6.5H17C17.83 6.5 18.5 7.17 18.5 8V16C18.5 16.83 17.83 17.5 17 17.5H5C4.17 17.5 3.5 16.83 3.5 16V6.5Z",
		stroke: "currentColor",
		strokeWidth: "1.4",
		strokeLinejoin: "round"
	})
});
var IconChat = () => /* @__PURE__ */ jsxs("svg", {
	width: "22",
	height: "22",
	viewBox: "0 0 22 22",
	fill: "none",
	"aria-hidden": "true",
	children: [/* @__PURE__ */ jsx("path", {
		d: "M4 5.5C4 4.67 4.67 4 5.5 4H16.5C17.33 4 18 4.67 18 5.5V13.5C18 14.33 17.33 15 16.5 15H8L4 18.5V5.5Z",
		stroke: "currentColor",
		strokeWidth: "1.4",
		strokeLinejoin: "round"
	}), /* @__PURE__ */ jsx("path", {
		d: "M8 8.5H14M8 11.5H11.5",
		stroke: "currentColor",
		strokeWidth: "1.4",
		strokeLinecap: "round"
	})]
});
var IconSettings = () => /* @__PURE__ */ jsxs("svg", {
	width: "22",
	height: "22",
	viewBox: "0 0 22 22",
	fill: "none",
	"aria-hidden": "true",
	children: [/* @__PURE__ */ jsx("circle", {
		cx: "11",
		cy: "11",
		r: "2.5",
		stroke: "currentColor",
		strokeWidth: "1.4"
	}), /* @__PURE__ */ jsx("path", {
		d: "M11 2.5V4.5M11 17.5V19.5M4.1 4.1L5.5 5.5M16.5 16.5L17.9 17.9M2.5 11H4.5M17.5 11H19.5M4.1 17.9L5.5 16.5M16.5 5.5L17.9 4.1",
		stroke: "currentColor",
		strokeWidth: "1.4",
		strokeLinecap: "round"
	})]
});
var IconCamera = () => /* @__PURE__ */ jsxs("svg", {
	width: "20",
	height: "20",
	viewBox: "0 0 20 20",
	fill: "none",
	"aria-hidden": "true",
	children: [
		/* @__PURE__ */ jsx("rect", {
			x: "2",
			y: "5.5",
			width: "16",
			height: "11",
			rx: "2",
			stroke: "currentColor",
			strokeWidth: "1.3"
		}),
		/* @__PURE__ */ jsx("circle", {
			cx: "10",
			cy: "11",
			r: "2.5",
			stroke: "currentColor",
			strokeWidth: "1.3"
		}),
		/* @__PURE__ */ jsx("path", {
			d: "M7 5.5L8 3.5H12L13 5.5",
			stroke: "currentColor",
			strokeWidth: "1.3",
			strokeLinejoin: "round"
		})
	]
});
var IconUpload = () => /* @__PURE__ */ jsxs("svg", {
	width: "20",
	height: "20",
	viewBox: "0 0 20 20",
	fill: "none",
	"aria-hidden": "true",
	children: [/* @__PURE__ */ jsx("path", {
		d: "M10 13.5V3.5M10 3.5L6.5 7M10 3.5L13.5 7",
		stroke: "currentColor",
		strokeWidth: "1.3",
		strokeLinecap: "round",
		strokeLinejoin: "round"
	}), /* @__PURE__ */ jsx("path", {
		d: "M4 13.5V15.5C4 16.33 4.67 17 5.5 17H14.5C15.33 17 16 16.33 16 15.5V13.5",
		stroke: "currentColor",
		strokeWidth: "1.3",
		strokeLinecap: "round"
	})]
});
var IconText = () => /* @__PURE__ */ jsx("svg", {
	width: "20",
	height: "20",
	viewBox: "0 0 20 20",
	fill: "none",
	"aria-hidden": "true",
	children: /* @__PURE__ */ jsx("path", {
		d: "M5 5H15M5 10H12M5 15H10",
		stroke: "currentColor",
		strokeWidth: "1.3",
		strokeLinecap: "round"
	})
});
var IconSend = () => /* @__PURE__ */ jsx("svg", {
	width: "18",
	height: "18",
	viewBox: "0 0 18 18",
	fill: "none",
	"aria-hidden": "true",
	children: /* @__PURE__ */ jsx("path", {
		d: "M2.5 9L15.5 3.5L11 9L15.5 14.5L2.5 9Z",
		stroke: "currentColor",
		strokeWidth: "1.3",
		strokeLinejoin: "round"
	})
});
var IconSpark = () => /* @__PURE__ */ jsx("svg", {
	width: "14",
	height: "14",
	viewBox: "0 0 14 14",
	fill: "none",
	"aria-hidden": "true",
	children: /* @__PURE__ */ jsx("path", {
		d: "M7 1L7.8 5.2L12 6L7.8 6.8L7 11L6.2 6.8L2 6L6.2 5.2L7 1Z",
		fill: "currentColor"
	})
});
//#endregion
//#region app/vault_app/components/ChatBubble.tsx
var ChatBubble = ({ message }) => {
	const isUser = message.role === "user";
	return /* @__PURE__ */ jsx("div", {
		className: `vault-chat-bubble-wrap ${isUser ? "vault-chat-bubble-wrap--user" : ""}`,
		children: /* @__PURE__ */ jsxs("div", {
			className: `vault-chat-bubble ${isUser ? "vault-chat-bubble--user" : "vault-chat-bubble--ai"}`,
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "vault-chat-bubble__text",
					children: message.text
				}),
				message.sources && message.sources.length > 0 && /* @__PURE__ */ jsx("div", {
					className: "vault-chat-sources",
					children: message.sources.map((source) => /* @__PURE__ */ jsxs("span", {
						className: "vault-chat-source",
						children: [/* @__PURE__ */ jsx(IconSpark, {}), source]
					}, source))
				}),
				/* @__PURE__ */ jsx("span", {
					className: "vault-chat-bubble__time vault-tabular",
					children: message.time
				})
			]
		})
	});
};
//#endregion
//#region app/vault_app/components/ChatComposer.tsx
var ChatComposer = () => /* @__PURE__ */ jsxs("div", {
	className: "vault-chat-composer",
	children: [/* @__PURE__ */ jsx("input", {
		type: "text",
		readOnly: true,
		placeholder: "Спросите по базе знаний...",
		className: "vault-chat-composer__input"
	}), /* @__PURE__ */ jsx("button", {
		type: "button",
		className: "vault-chat-composer__send",
		"aria-label": "Отправить",
		children: /* @__PURE__ */ jsx(IconSend, {})
	})]
});
//#endregion
//#region app/vault_app/components/ContainerHeader.tsx
var ContainerHeader = ({ title, subtitle }) => /* @__PURE__ */ jsx("div", {
	className: "vault-drive-header",
	children: /* @__PURE__ */ jsxs("div", {
		className: "vault-drive-header__top",
		children: [
			/* @__PURE__ */ jsx("button", {
				type: "button",
				className: "vault-icon-btn",
				"aria-label": "Назад",
				children: /* @__PURE__ */ jsx(IconChevronLeft, {})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "vault-drive-header__title-wrap",
				children: [/* @__PURE__ */ jsx("h1", {
					className: "vault-drive-header__title",
					children: title
				}), subtitle && /* @__PURE__ */ jsx("p", {
					className: "vault-drive-header__subtitle",
					children: subtitle
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "vault-drive-header__actions",
				children: /* @__PURE__ */ jsx("button", {
					type: "button",
					className: "vault-icon-btn",
					"aria-label": "Ещё",
					children: /* @__PURE__ */ jsx(IconMore, {})
				})
			})
		]
	})
});
//#endregion
//#region app/vault_app/components/ContainerTabBar.tsx
var tabs = [
	{
		id: "data",
		label: "Данные"
	},
	{
		id: "chat",
		label: "ИИ Чат"
	},
	{
		id: "settings",
		label: "Настройки"
	}
];
var icons = {
	data: IconFolder,
	chat: IconChat,
	settings: IconSettings
};
var ContainerTabBar = ({ activeTab }) => /* @__PURE__ */ jsx("nav", {
	className: "vault-tab-bar",
	"aria-label": "Навигация контейнера",
	children: tabs.map(({ id, label }) => {
		const Icon = icons[id];
		const isActive = activeTab === id;
		return /* @__PURE__ */ jsxs("div", {
			className: `vault-tab-bar__item ${isActive ? "vault-tab-bar__item--active" : ""}`,
			"aria-current": isActive ? "page" : void 0,
			children: [/* @__PURE__ */ jsx("span", {
				className: "vault-tab-bar__icon",
				children: /* @__PURE__ */ jsx(Icon, {})
			}), /* @__PURE__ */ jsx("span", {
				className: "vault-tab-bar__label",
				children: label
			})]
		}, id);
	})
});
//#endregion
//#region app/vault_app/components/ScreenShell.tsx
var ScreenShell = ({ children, footer, fab }) => /* @__PURE__ */ jsx("div", {
	className: "vault-screen vault-screen-enter h-[844px] overflow-hidden",
	children: /* @__PURE__ */ jsxs("div", {
		className: "vault-screen__content relative flex h-full flex-col",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "vault-hide-scrollbar flex-1 overflow-y-auto",
				children
			}),
			fab,
			footer
		]
	})
});
//#endregion
//#region app/vault_app/components/StatusBar.tsx
var StatusBar = () => /* @__PURE__ */ jsxs("div", {
	className: "flex h-11 items-end justify-between px-5 pb-1 pt-2 vault-text",
	children: [/* @__PURE__ */ jsx("span", {
		className: "text-[13px] font-semibold",
		children: "9:41"
	}), /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-1",
		children: [
			/* @__PURE__ */ jsxs("svg", {
				width: "16",
				height: "12",
				viewBox: "0 0 16 12",
				fill: "none",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ jsx("rect", {
						x: "0",
						y: "6",
						width: "3",
						height: "6",
						rx: "0.5",
						fill: "currentColor"
					}),
					/* @__PURE__ */ jsx("rect", {
						x: "4.5",
						y: "4",
						width: "3",
						height: "8",
						rx: "0.5",
						fill: "currentColor"
					}),
					/* @__PURE__ */ jsx("rect", {
						x: "9",
						y: "2",
						width: "3",
						height: "10",
						rx: "0.5",
						fill: "currentColor"
					}),
					/* @__PURE__ */ jsx("rect", {
						x: "13.5",
						y: "0",
						width: "2.5",
						height: "12",
						rx: "0.5",
						fill: "currentColor"
					})
				]
			}),
			/* @__PURE__ */ jsxs("svg", {
				width: "15",
				height: "12",
				viewBox: "0 0 15 12",
				fill: "none",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ jsx("path", {
						d: "M7.5 2.5C9.8 2.5 11.9 3.4 13.4 5L14.8 3.6C12.9 1.4 10.3 0 7.5 0C4.7 0 2.1 1.4 0.2 3.6L1.6 5C3.1 3.4 5.2 2.5 7.5 2.5Z",
						fill: "currentColor"
					}),
					/* @__PURE__ */ jsx("path", {
						d: "M7.5 6.5C8.9 6.5 10.2 7 11.2 8L12.6 6.6C11.2 5.2 9.4 4.5 7.5 4.5C5.6 4.5 3.8 5.2 2.4 6.6L3.8 8C4.8 7 6.1 6.5 7.5 6.5Z",
						fill: "currentColor"
					}),
					/* @__PURE__ */ jsx("circle", {
						cx: "7.5",
						cy: "10.5",
						r: "1.5",
						fill: "currentColor"
					})
				]
			}),
			/* @__PURE__ */ jsxs("svg", {
				width: "25",
				height: "12",
				viewBox: "0 0 25 12",
				fill: "none",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ jsx("rect", {
						x: "0.5",
						y: "0.5",
						width: "21",
						height: "11",
						rx: "2.5",
						stroke: "currentColor",
						strokeOpacity: "0.35"
					}),
					/* @__PURE__ */ jsx("rect", {
						x: "2",
						y: "2",
						width: "16",
						height: "8",
						rx: "1.5",
						fill: "currentColor"
					}),
					/* @__PURE__ */ jsx("path", {
						d: "M23 4.5V7.5C23.8 7.2 24.5 6.5 24.5 6C24.5 5.5 23.8 4.8 23 4.5Z",
						fill: "currentColor",
						fillOpacity: "0.4"
					})
				]
			})
		]
	})]
});
//#endregion
//#region app/vault_app/data/containers.ts
var containers = [
	{
		id: "contracts-2024",
		name: "Договоры 2024",
		description: "Архив подписанных договоров, актов и допсоглашений с клиентами",
		sourcesCount: 12,
		createdAt: "14 мар",
		role: "work"
	},
	{
		id: "recipes",
		name: "Рецепты и заметки",
		description: "Кулинарные рецепты, списки покупок и заметки с фото продуктов",
		sourcesCount: 8,
		createdAt: "2 фев",
		role: "personal"
	},
	{
		id: "market-research",
		name: "Исследование рынка",
		description: "Отчёты, презентации и конспекты по анализу конкурентов Q1",
		sourcesCount: 24,
		createdAt: "28 янв",
		role: "shared"
	},
	{
		id: "lecture-notes",
		name: "Лекции по ML",
		description: "Конспекты лекций, слайды и распознанные формулы из тетради",
		sourcesCount: 16,
		createdAt: "10 янв",
		role: "personal"
	}
];
var activeContainer = containers[0];
//#endregion
//#region app/vault_app/data/chat.ts
var chatMessages = [
	{
		id: "m1",
		role: "user",
		text: "Какие условия оплаты указаны в договоре аренды?",
		time: "14:32"
	},
	{
		id: "m2",
		role: "assistant",
		text: "По договору аренды оплата производится ежемесячно до 10-го числа. Аванс за первый месяц вносится при подписании. При просрочке начисляется пеня 0,1% в день от суммы задолженности.",
		time: "14:32",
		sources: ["Договор аренды — стр. 1–2", "Условия оплаты"]
	},
	{
		id: "m3",
		role: "user",
		text: "А какой срок действия допсоглашения №3?",
		time: "14:34"
	},
	{
		id: "m4",
		role: "assistant",
		text: "Допсоглашение №3 действует до 31 декабря 2024 года с автоматической пролонгацией на 12 месяцев, если ни одна из сторон не уведомит о расторжении за 30 дней.",
		time: "14:34",
		sources: ["Допсоглашение_№3.pdf"]
	}
];
//#endregion
//#region app/vault_app/screens/ContainerChatScreen.tsx
var ContainerChatScreen = () => /* @__PURE__ */ jsxs(ScreenShell, {
	footer: /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(ChatComposer, {}), /* @__PURE__ */ jsx(ContainerTabBar, { activeTab: "chat" })] }),
	children: [
		/* @__PURE__ */ jsx(StatusBar, {}),
		/* @__PURE__ */ jsx(ContainerHeader, {
			title: activeContainer.name,
			subtitle: "ИИ Чат"
		}),
		/* @__PURE__ */ jsx("div", {
			className: "vault-chat-hint px-5",
			children: "Задавайте вопросы по документам контейнера — ответы с цитированием источников"
		}),
		/* @__PURE__ */ jsx("div", {
			className: "vault-chat-messages px-5 pb-4",
			children: chatMessages.map((message) => /* @__PURE__ */ jsx(ChatBubble, { message }, message.id))
		})
	]
});
//#endregion
//#region app/vault_app/components/DriveSourceRow.tsx
var PdfIcon = () => /* @__PURE__ */ jsx("div", {
	className: "vault-drive-icon vault-drive-icon--pdf",
	children: /* @__PURE__ */ jsx("span", {
		className: "vault-drive-icon__badge",
		children: "PDF"
	})
});
var TextIcon = () => /* @__PURE__ */ jsx("div", {
	className: "vault-drive-icon vault-drive-icon--text",
	children: "T"
});
var DriveSourceRow = ({ source }) => {
	const renderIcon = () => {
		if (source.type === "photo" && source.thumbnail) return /* @__PURE__ */ jsx("img", {
			src: source.thumbnail,
			alt: "",
			className: "vault-drive-thumb"
		});
		if (source.type === "text") return /* @__PURE__ */ jsx(TextIcon, {});
		return /* @__PURE__ */ jsx(PdfIcon, {});
	};
	const renderSubtitle = () => {
		if (source.type === "pdf") return `${source.fileSize} · ${source.date}`;
		if (source.type === "photo") return `${source.meta} · ${source.date}`;
		if (source.excerpt) return source.excerpt;
		return source.date;
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "vault-drive-row",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "vault-drive-row__icon",
				children: renderIcon()
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "vault-drive-row__body",
				children: [/* @__PURE__ */ jsx("div", {
					className: "vault-drive-row__title",
					children: source.title
				}), /* @__PURE__ */ jsx("div", {
					className: "vault-drive-row__meta vault-tabular",
					children: renderSubtitle()
				})]
			}),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				className: "vault-icon-btn vault-icon-btn--sm vault-drive-row__more",
				"aria-label": "Действия",
				children: /* @__PURE__ */ jsx(IconMore, {})
			})
		]
	});
};
//#endregion
//#region app/vault_app/components/DriveToolbar.tsx
var DriveToolbar = ({ count }) => /* @__PURE__ */ jsxs("div", {
	className: "vault-drive-toolbar",
	children: [/* @__PURE__ */ jsxs("span", {
		className: "vault-drive-toolbar__count vault-tabular",
		children: [
			count,
			" ",
			count === 1 ? "файл" : count < 5 ? "файла" : "файлов"
		]
	}), /* @__PURE__ */ jsxs("div", {
		className: "vault-drive-toolbar__actions",
		children: [
			/* @__PURE__ */ jsx("button", {
				type: "button",
				className: "vault-icon-btn vault-icon-btn--sm",
				"aria-label": "Сортировка",
				children: /* @__PURE__ */ jsx(IconSort, {})
			}),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				className: "vault-icon-btn vault-icon-btn--sm vault-icon-btn--active",
				"aria-label": "Список",
				children: /* @__PURE__ */ jsx(IconListView, {})
			}),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				className: "vault-icon-btn vault-icon-btn--sm",
				"aria-label": "Сетка",
				children: /* @__PURE__ */ jsx(IconGridView, {})
			})
		]
	})]
});
//#endregion
//#region app/vault_app/components/UploadFab.tsx
var UploadFab = () => /* @__PURE__ */ jsxs("div", {
	className: "vault-fab-wrap",
	children: [/* @__PURE__ */ jsxs("div", {
		className: "vault-fab-menu",
		children: [
			/* @__PURE__ */ jsxs("button", {
				type: "button",
				className: "vault-fab-menu__item",
				children: [/* @__PURE__ */ jsx("span", {
					className: "vault-fab-menu__icon",
					children: /* @__PURE__ */ jsx(IconCamera, {})
				}), "Фото"]
			}),
			/* @__PURE__ */ jsxs("button", {
				type: "button",
				className: "vault-fab-menu__item",
				children: [/* @__PURE__ */ jsx("span", {
					className: "vault-fab-menu__icon",
					children: /* @__PURE__ */ jsx(IconUpload, {})
				}), "Файл"]
			}),
			/* @__PURE__ */ jsxs("button", {
				type: "button",
				className: "vault-fab-menu__item",
				children: [/* @__PURE__ */ jsx("span", {
					className: "vault-fab-menu__icon",
					children: /* @__PURE__ */ jsx(IconText, {})
				}), "Текст"]
			})
		]
	}), /* @__PURE__ */ jsx("button", {
		type: "button",
		className: "vault-fab",
		"aria-label": "Добавить",
		children: /* @__PURE__ */ jsx(IconPlus, {})
	})]
});
//#endregion
//#region app/vault_app/data/sources.ts
var sources = [
	{
		id: "src-1",
		containerId: "contracts-2024",
		type: "photo",
		title: "Договор аренды — стр. 1–2",
		meta: "Распознано · 2 стр.",
		date: "12 мар",
		thumbnail: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=120&h=120&fit=crop"
	},
	{
		id: "src-2",
		containerId: "contracts-2024",
		type: "pdf",
		title: "Допсоглашение_№3.pdf",
		fileSize: "1.2 МБ",
		date: "10 мар"
	},
	{
		id: "src-3",
		containerId: "contracts-2024",
		type: "text",
		title: "Условия оплаты",
		excerpt: "Оплата производится в течение 10 рабочих дней с момента подписания акта выполненных работ...",
		date: "8 мар"
	},
	{
		id: "src-4",
		containerId: "contracts-2024",
		type: "photo",
		title: "Акт выполненных работ",
		meta: "Распознано · 1 стр.",
		date: "5 мар",
		thumbnail: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=120&h=120&fit=crop"
	},
	{
		id: "src-5",
		containerId: "contracts-2024",
		type: "pdf",
		title: "Договор_поставки_v2.pdf",
		fileSize: "3.4 МБ",
		date: "1 мар"
	},
	{
		id: "src-6",
		containerId: "contracts-2024",
		type: "text",
		title: "Контакты контрагента",
		excerpt: "ООО «ТехноСнаб», ИНН 7701234567, юр. адрес: г. Москва, ул. Примерная, д. 15...",
		date: "28 фев"
	}
];
//#endregion
//#region app/vault_app/screens/ContainerDataScreen.tsx
var ContainerDataScreen = () => /* @__PURE__ */ jsxs(ScreenShell, {
	footer: /* @__PURE__ */ jsx(ContainerTabBar, { activeTab: "data" }),
	fab: /* @__PURE__ */ jsx(UploadFab, {}),
	children: [
		/* @__PURE__ */ jsx(StatusBar, {}),
		/* @__PURE__ */ jsx(ContainerHeader, {
			title: activeContainer.name,
			subtitle: `${sources.length} файлов`
		}),
		/* @__PURE__ */ jsx("div", {
			className: "vault-drive-search",
			children: /* @__PURE__ */ jsx("input", {
				type: "text",
				readOnly: true,
				placeholder: "Поиск в контейнере",
				className: "vault-drive-search__input"
			})
		}),
		/* @__PURE__ */ jsx(DriveToolbar, { count: sources.length }),
		/* @__PURE__ */ jsx("div", {
			className: "vault-drive-list",
			children: sources.map((source) => /* @__PURE__ */ jsx(DriveSourceRow, { source }, source.id))
		})
	]
});
//#endregion
//#region app/vault_app/components/ModelSelector.tsx
var ModelSelector = ({ models, selectedId }) => {
	const selected = models.find((m) => m.id === selectedId) ?? models[0];
	return /* @__PURE__ */ jsxs("button", {
		type: "button",
		className: "vault-settings-select",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "vault-settings-select__info",
			children: [
				/* @__PURE__ */ jsx("span", {
					className: "vault-settings-select__label",
					children: "Модель"
				}),
				/* @__PURE__ */ jsx("span", {
					className: "vault-settings-select__value",
					children: selected.name
				}),
				/* @__PURE__ */ jsx("span", {
					className: "vault-settings-select__provider",
					children: selected.provider
				})
			]
		}), /* @__PURE__ */ jsx(IconChevronDown, {})]
	});
};
//#endregion
//#region app/vault_app/components/SettingsFields.tsx
var SettingsTextarea = ({ label, value, hint }) => /* @__PURE__ */ jsxs("div", {
	className: "vault-settings-field",
	children: [
		/* @__PURE__ */ jsx("label", {
			className: "vault-settings-field__label",
			children: label
		}),
		/* @__PURE__ */ jsx("div", {
			className: "vault-settings-textarea",
			children: value
		}),
		hint && /* @__PURE__ */ jsx("p", {
			className: "vault-settings-field__hint",
			children: hint
		})
	]
});
var SettingsSlider = ({ label, value, min, max, format }) => {
	const pct = (value - min) / (max - min) * 100;
	const display = format ? format(value) : String(value);
	return /* @__PURE__ */ jsxs("div", {
		className: "vault-settings-field",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "vault-settings-slider__header",
			children: [/* @__PURE__ */ jsx("span", {
				className: "vault-settings-field__label",
				children: label
			}), /* @__PURE__ */ jsx("span", {
				className: "vault-settings-slider__value vault-tabular",
				children: display
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "vault-settings-slider",
			children: /* @__PURE__ */ jsxs("div", {
				className: "vault-settings-slider__track",
				children: [/* @__PURE__ */ jsx("div", {
					className: "vault-settings-slider__fill",
					style: { width: `${pct}%` }
				}), /* @__PURE__ */ jsx("div", {
					className: "vault-settings-slider__thumb",
					style: { left: `${pct}%` }
				})]
			})
		})]
	});
};
var SettingsToggle = ({ label, description, enabled }) => /* @__PURE__ */ jsxs("div", {
	className: "vault-settings-toggle",
	children: [/* @__PURE__ */ jsxs("div", {
		className: "vault-settings-toggle__info",
		children: [/* @__PURE__ */ jsx("span", {
			className: "vault-settings-toggle__label",
			children: label
		}), description && /* @__PURE__ */ jsx("span", {
			className: "vault-settings-toggle__desc",
			children: description
		})]
	}), /* @__PURE__ */ jsx("div", {
		className: `vault-settings-toggle__switch ${enabled ? "vault-settings-toggle__switch--on" : ""}`,
		children: /* @__PURE__ */ jsx("div", { className: "vault-settings-toggle__knob" })
	})]
});
//#endregion
//#region app/vault_app/data/settings.ts
var aiModels = [
	{
		id: "gpt-4o",
		name: "GPT-4o",
		provider: "OpenAI"
	},
	{
		id: "claude-sonnet",
		name: "Claude Sonnet",
		provider: "Anthropic"
	},
	{
		id: "gemini-pro",
		name: "Gemini Pro",
		provider: "Google"
	},
	{
		id: "gpt-4o-mini",
		name: "GPT-4o mini",
		provider: "OpenAI"
	}
];
var containerSettings = {
	modelId: "gpt-4o",
	systemPrompt: "Ты — ассистент по базе документов. Отвечай точно, ссылайся на источники. Если информации нет в базе — честно сообщи об этом.",
	temperature: .3,
	maxTokens: 2048,
	topK: 5,
	citeSources: true,
	autoIndex: true
};
//#endregion
//#region app/vault_app/screens/ContainerSettingsScreen.tsx
var ContainerSettingsScreen = () => {
	const s = containerSettings;
	return /* @__PURE__ */ jsxs(ScreenShell, {
		footer: /* @__PURE__ */ jsx(ContainerTabBar, { activeTab: "settings" }),
		children: [
			/* @__PURE__ */ jsx(StatusBar, {}),
			/* @__PURE__ */ jsx(ContainerHeader, {
				title: activeContainer.name,
				subtitle: "Настройки"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "vault-settings px-5 pb-6",
				children: [
					/* @__PURE__ */ jsxs("section", {
						className: "vault-settings-section",
						children: [
							/* @__PURE__ */ jsx("h2", {
								className: "vault-settings-section__title",
								children: "ИИ"
							}),
							/* @__PURE__ */ jsx(ModelSelector, {
								models: aiModels,
								selectedId: s.modelId
							}),
							/* @__PURE__ */ jsx(SettingsTextarea, {
								label: "Системный промпт",
								value: s.systemPrompt,
								hint: "Инструкция для модели при ответах по этому контейнеру"
							})
						]
					}),
					/* @__PURE__ */ jsxs("section", {
						className: "vault-settings-section",
						children: [
							/* @__PURE__ */ jsx("h2", {
								className: "vault-settings-section__title",
								children: "Параметры"
							}),
							/* @__PURE__ */ jsx(SettingsSlider, {
								label: "Temperature",
								value: s.temperature,
								min: 0,
								max: 1,
								format: (v) => v.toFixed(1)
							}),
							/* @__PURE__ */ jsx(SettingsSlider, {
								label: "Max tokens",
								value: s.maxTokens,
								min: 256,
								max: 4096,
								format: (v) => String(v)
							}),
							/* @__PURE__ */ jsx(SettingsSlider, {
								label: "Top K результатов",
								value: s.topK,
								min: 1,
								max: 10
							})
						]
					}),
					/* @__PURE__ */ jsxs("section", {
						className: "vault-settings-section",
						children: [
							/* @__PURE__ */ jsx("h2", {
								className: "vault-settings-section__title",
								children: "RAG"
							}),
							/* @__PURE__ */ jsx(SettingsToggle, {
								label: "Цитировать источники",
								description: "Показывать ссылки на документы в ответах",
								enabled: s.citeSources
							}),
							/* @__PURE__ */ jsx(SettingsToggle, {
								label: "Автоиндексация",
								description: "Индексировать новые файлы сразу после загрузки",
								enabled: s.autoIndex
							})
						]
					})
				]
			})
		]
	});
};
//#endregion
//#region app/vault_app/components/RoleBadge.tsx
var roleLabels = {
	personal: "Личный",
	work: "Рабочий",
	shared: "Общий"
};
var RoleBadge = ({ role }) => /* @__PURE__ */ jsx("span", {
	className: `vault-role-badge ${role !== "personal" ? `vault-role-badge--${role}` : ""}`,
	children: roleLabels[role]
});
//#endregion
//#region app/vault_app/components/ContainerCard.tsx
var ContainerCard = ({ container }) => /* @__PURE__ */ jsxs("div", {
	className: "vault-card p-4",
	children: [
		/* @__PURE__ */ jsx("h3", {
			className: "text-[17px] font-medium vault-text",
			children: container.name
		}),
		/* @__PURE__ */ jsx("p", {
			className: "mt-1.5 line-clamp-2 text-[14px] leading-snug vault-text-muted",
			children: container.description
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "mt-4 grid grid-cols-3 gap-3",
			children: [
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
					className: "vault-micro-label",
					children: "Источники"
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-1 text-[15px] font-medium vault-tabular vault-text-blue",
					children: container.sourcesCount
				})] }),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
					className: "vault-micro-label",
					children: "Создан"
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-1 text-[15px] font-medium vault-tabular vault-text",
					children: container.createdAt
				})] }),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
					className: "vault-micro-label",
					children: "Роль"
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-1",
					children: /* @__PURE__ */ jsx(RoleBadge, { role: container.role })
				})] })
			]
		})
	]
});
//#endregion
//#region app/vault_app/components/PrimaryButton.tsx
var PrimaryButton = ({ children }) => /* @__PURE__ */ jsxs("button", {
	type: "button",
	className: "vault-btn-primary",
	children: [/* @__PURE__ */ jsx(IconPlus, {}), children]
});
//#endregion
//#region app/vault_app/screens/ContainersScreen.tsx
var ContainersScreen = () => /* @__PURE__ */ jsxs(ScreenShell, { children: [/* @__PURE__ */ jsxs("div", {
	className: "px-5 pb-24",
	children: [
		/* @__PURE__ */ jsx(StatusBar, {}),
		/* @__PURE__ */ jsx("h1", {
			className: "vault-display-title mt-1",
			children: "Мои контейнеры"
		}),
		/* @__PURE__ */ jsxs("p", {
			className: "mt-2 text-[14px] vault-text-muted vault-tabular",
			children: [containers.length, " контейнера"]
		}),
		/* @__PURE__ */ jsx("div", {
			className: "mt-7 space-y-3",
			children: containers.map((container) => /* @__PURE__ */ jsx(ContainerCard, { container }, container.id))
		})
	]
}), /* @__PURE__ */ jsx("div", {
	className: "vault-containers-footer",
	children: /* @__PURE__ */ jsx(PrimaryButton, { children: "Создать контейнер" })
})] });
//#endregion
//#region app/vault_app/components/PdfDocumentPreview.tsx
var PdfPage = ({ pageNum }) => /* @__PURE__ */ jsxs("div", {
	className: "vault-pdf-page",
	children: [/* @__PURE__ */ jsxs("div", {
		className: "vault-pdf-page__header",
		children: [/* @__PURE__ */ jsx("span", {
			className: "vault-pdf-page__badge",
			children: "PDF"
		}), /* @__PURE__ */ jsx("span", {
			className: "vault-pdf-page__num vault-tabular",
			children: pageNum
		})]
	}), /* @__PURE__ */ jsxs("div", {
		className: "vault-pdf-page__body",
		children: [
			/* @__PURE__ */ jsx("div", { className: "vault-pdf-page__title-line" }),
			/* @__PURE__ */ jsx("div", { className: "vault-pdf-page__line" }),
			/* @__PURE__ */ jsx("div", { className: "vault-pdf-page__line" }),
			/* @__PURE__ */ jsx("div", { className: "vault-pdf-page__line vault-pdf-page__line--short" }),
			/* @__PURE__ */ jsx("div", { className: "vault-pdf-page__gap" }),
			/* @__PURE__ */ jsx("div", { className: "vault-pdf-page__line" }),
			/* @__PURE__ */ jsx("div", { className: "vault-pdf-page__line" }),
			/* @__PURE__ */ jsx("div", { className: "vault-pdf-page__line vault-pdf-page__line--medium" }),
			/* @__PURE__ */ jsx("div", { className: "vault-pdf-page__line" }),
			/* @__PURE__ */ jsx("div", { className: "vault-pdf-page__line vault-pdf-page__line--short" }),
			/* @__PURE__ */ jsx("div", { className: "vault-pdf-page__gap" }),
			/* @__PURE__ */ jsx("div", { className: "vault-pdf-page__line" }),
			/* @__PURE__ */ jsx("div", { className: "vault-pdf-page__line vault-pdf-page__line--medium" }),
			/* @__PURE__ */ jsx("div", { className: "vault-pdf-page__line" })
		]
	})]
});
var PdfDocumentPreview = ({ pages }) => /* @__PURE__ */ jsx("div", {
	className: "vault-pdf-viewer",
	children: /* @__PURE__ */ jsx("div", {
		className: "vault-pdf-viewer__scroll",
		children: Array.from({ length: Math.min(pages, 2) }, (_, i) => /* @__PURE__ */ jsx(PdfPage, { pageNum: i + 1 }, i))
	})
});
//#endregion
//#region app/vault_app/data/filePreview.ts
var pdfPreview = {
	id: "src-2",
	title: "Допсоглашение_№3.pdf",
	fileSize: "1.2 МБ",
	pages: 3,
	date: "10 мар 2024",
	content: `ДОПОЛНИТЕЛЬНОЕ СОГЛАШЕНИЕ № 3
к Договору аренды нежилого помещения от 15.01.2024

г. Москва                                                    «01» марта 2024 г.

ООО «Арендодатель», именуемое в дальнейшем «Арендодатель», в лице генерального директора Иванова И.И., действующего на основании Устава, с одной стороны, и ООО «Арендатор», именуемое в дальнейшем «Арендатор», в лице директора Петрова П.П., действующего на основании Устава, с другой стороны, заключили настоящее Дополнительное соглашение о нижеследующем:

1. Срок действия Договора продлевается до 31 декабря 2024 года с автоматической пролонгацией на 12 (двенадцать) месяцев, если ни одна из Сторон не уведомит другую Сторону о расторжении не менее чем за 30 (тридцать) календарных дней до окончания срока действия.

2. Размер арендной платы с 01 апреля 2024 года составляет 185 000 (сто восемьдесят пять тысяч) рублей 00 копеек в месяц, включая НДС.

3. Арендатор обязуется произвести косметический ремонт помещения в срок до 15 апреля 2024 года. Стоимость ремонта компенсируется Арендодателем в размере 50% фактически понесённых расходов при предоставлении подтверждающих документов.

4. Настоящее Дополнительное соглашение является неотъемлемой частью Договора и вступает в силу с момента подписания обеими Сторонами.

5. Во всём остальном, что не предусмотрено настоящим Дополнительным соглашением, Стороны руководствуются условиями Договора.

Реквизиты и подписи Сторон:

Арендодатель: ООО «Арендодатель»          Арендатор: ООО «Арендатор»
ИНН 7701234567                             ИНН 7709876543

________________ / Иванов И.И. /          ________________ / Петров П.П. /`
};
//#endregion
//#region app/vault_app/screens/FilePreviewScreen.tsx
var FilePreviewScreen = () => /* @__PURE__ */ jsxs(ScreenShell, { children: [
	/* @__PURE__ */ jsx(StatusBar, {}),
	/* @__PURE__ */ jsx("div", {
		className: "vault-preview-topbar",
		children: /* @__PURE__ */ jsx("button", {
			type: "button",
			className: "vault-icon-btn",
			"aria-label": "Назад",
			children: /* @__PURE__ */ jsx(IconChevronLeft, {})
		})
	}),
	/* @__PURE__ */ jsx(PdfDocumentPreview, { pages: pdfPreview.pages }),
	/* @__PURE__ */ jsxs("div", {
		className: "vault-preview-body px-5 pb-8",
		children: [
			/* @__PURE__ */ jsx("h1", {
				className: "vault-preview-title",
				children: pdfPreview.title
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "vault-preview-meta vault-tabular",
				children: [
					pdfPreview.fileSize,
					" · ",
					pdfPreview.pages,
					" стр. · ",
					pdfPreview.date
				]
			}),
			/* @__PURE__ */ jsx("div", { className: "vault-preview-divider" }),
			/* @__PURE__ */ jsx("p", {
				className: "vault-preview-label",
				children: "Распознанный текст"
			}),
			/* @__PURE__ */ jsx("div", {
				className: "vault-preview-text",
				children: pdfPreview.content
			})
		]
	})
] });
//#endregion
//#region app/vault_app/frame.tsx
var VaultFrame = () => /* @__PURE__ */ jsxs("div", {
	className: "vault-root vault-showcase grid grid-cols-2 gap-10",
	children: [
		/* @__PURE__ */ jsx(PhoneFrame, {
			label: "Мои контейнеры",
			children: /* @__PURE__ */ jsx(ContainersScreen, {})
		}),
		/* @__PURE__ */ jsx(PhoneFrame, {
			label: "Контейнер · Данные",
			children: /* @__PURE__ */ jsx(ContainerDataScreen, {})
		}),
		/* @__PURE__ */ jsx(PhoneFrame, {
			label: "Предпросмотр файла",
			children: /* @__PURE__ */ jsx(FilePreviewScreen, {})
		}),
		/* @__PURE__ */ jsx(PhoneFrame, {
			label: "Контейнер · ИИ Чат",
			children: /* @__PURE__ */ jsx(ContainerChatScreen, {})
		}),
		/* @__PURE__ */ jsx(PhoneFrame, {
			label: "Контейнер · Настройки",
			children: /* @__PURE__ */ jsx(ContainerSettingsScreen, {})
		})
	]
});
//#endregion
//#region app/frames/registry.ts
var frames = [
	{
		id: "cantata-app",
		name: "Cantata",
		description: "Мобильное приложение Cantata",
		component: CantataFrame
	},
	{
		id: "forma-app",
		name: "Forma",
		description: "AI-приложение: фото → 3D-модель GLB",
		layout: "showcase",
		component: FormaFrame
	},
	{
		id: "coach-app",
		name: "Coach",
		description: "Курсы каллиграфии с AI-разбором работ",
		layout: "showcase",
		component: CoachFrame
	},
	{
		id: "pay-app",
		name: "Pay SMS",
		description: "SMS-переводы и QR для приёма платежей",
		layout: "showcase",
		component: PayFrame
	},
	{
		id: "vault-app",
		name: "Vault",
		description: "База знаний с ИИ и RAG-контейнерами",
		layout: "showcase",
		component: VaultFrame
	}
];
var getFrameById = (id) => frames.find((frame) => frame.id === id);
//#endregion
//#region app/routes/home.tsx
var home_exports = /* @__PURE__ */ __exportAll({
	default: () => home_default,
	meta: () => meta$1
});
var meta$1 = () => [{ title: "Design Frames" }, {
	name: "description",
	content: "Каталог дизайн-фреймов"
}];
var Home = () => /* @__PURE__ */ jsx("main", {
	className: "min-h-screen bg-gray-50 px-6 py-12 dark:bg-gray-950",
	children: /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-4xl",
		children: [
			/* @__PURE__ */ jsx("h1", {
				className: "text-3xl font-bold text-gray-900 dark:text-gray-100",
				children: "Design Frames"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-2 text-gray-600 dark:text-gray-400",
				children: "Выберите фрейм для просмотра и редактирования"
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-10 grid gap-4 sm:grid-cols-2",
				children: frames.map((frame) => /* @__PURE__ */ jsxs(Link, {
					to: `/frames/${frame.id}`,
					className: "rounded-xl border border-gray-200 bg-white p-6 transition hover:border-gray-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-lg font-semibold text-gray-900 dark:text-gray-100",
						children: frame.name
					}), frame.description && /* @__PURE__ */ jsx("p", {
						className: "mt-2 text-sm text-gray-500 dark:text-gray-400",
						children: frame.description
					})]
				}, frame.id))
			})
		]
	})
});
var home_default = UNSAFE_withComponentProps(Home);
//#endregion
//#region app/components/frame-showcase-viewport.tsx
var FrameShowcaseViewport = ({ children }) => /* @__PURE__ */ jsxs("div", {
	className: "flex min-h-screen flex-col items-center bg-gray-100 px-4 py-8 dark:bg-gray-900",
	children: [/* @__PURE__ */ jsx(Link, {
		to: "/",
		className: "mb-6 self-start text-sm text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100",
		children: "← Назад"
	}), /* @__PURE__ */ jsx("div", {
		className: "w-full overflow-x-auto pb-4",
		children: /* @__PURE__ */ jsx("div", {
			className: "mx-auto w-fit min-w-0 px-2",
			children
		})
	})]
});
//#endregion
//#region app/components/frame-viewport.tsx
var FrameViewport = ({ children }) => /* @__PURE__ */ jsxs("div", {
	className: "flex min-h-screen flex-col items-center bg-gray-100 px-4 py-8 dark:bg-gray-900",
	children: [/* @__PURE__ */ jsx(Link, {
		to: "/",
		className: "mb-6 text-sm text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100",
		children: "← Назад"
	}), /* @__PURE__ */ jsx("div", {
		className: "overflow-hidden rounded-[2.5rem] border-[6px] border-gray-900 bg-gray-900 shadow-2xl dark:border-gray-700",
		children: /* @__PURE__ */ jsx("div", {
			className: "h-[844px] w-[390px] overflow-y-auto bg-white",
			children
		})
	})]
});
//#endregion
//#region app/routes/frames.$frameId.tsx
var frames_$frameId_exports = /* @__PURE__ */ __exportAll({
	default: () => frames_$frameId_default,
	loader: () => loader,
	meta: () => meta
});
var meta = ({ params }) => {
	const frame = getFrameById(params.frameId);
	return [{ title: frame ? `${frame.name} — Design Frame` : "Frame not found" }, {
		name: "description",
		content: frame?.description ?? "Design frame preview"
	}];
};
var loader = ({ params }) => {
	const frame = getFrameById(params.frameId);
	if (!frame) throw new Response("Not Found", { status: 404 });
	return { frameId: frame.id };
};
var FramePage = ({ loaderData }) => {
	const frame = getFrameById(loaderData.frameId);
	if (!frame) return null;
	const FrameComponent = frame.component;
	return /* @__PURE__ */ jsx(frame.layout === "showcase" ? FrameShowcaseViewport : FrameViewport, { children: /* @__PURE__ */ jsx(FrameComponent, {}) });
};
var frames_$frameId_default = UNSAFE_withComponentProps(FramePage);
//#endregion
//#region \0virtual:react-router/server-manifest
var server_manifest_default = {
	"entry": {
		"module": "/assets/entry.client-BqF5znXE.js",
		"imports": ["/assets/jsx-runtime-CE8f_55p.js"],
		"css": []
	},
	"routes": {
		"root": {
			"id": "root",
			"parentId": void 0,
			"path": "",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": true,
			"module": "/assets/root-DlkFg-xp.js",
			"imports": ["/assets/jsx-runtime-CE8f_55p.js"],
			"css": ["/assets/root-DsDc__Qs.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/home": {
			"id": "routes/home",
			"parentId": "root",
			"path": void 0,
			"index": true,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/home-CC_SwK1C.js",
			"imports": ["/assets/jsx-runtime-CE8f_55p.js", "/assets/registry-DT9xqAcm.js"],
			"css": ["/assets/registry-BWN0y7Ls.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/frames.$frameId": {
			"id": "routes/frames.$frameId",
			"parentId": "root",
			"path": "frames/:frameId",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/frames._frameId-BNI1Rx6d.js",
			"imports": ["/assets/jsx-runtime-CE8f_55p.js", "/assets/registry-DT9xqAcm.js"],
			"css": ["/assets/registry-BWN0y7Ls.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		}
	},
	"url": "/assets/manifest-55c0578b.js",
	"version": "55c0578b",
	"sri": void 0
};
//#endregion
//#region \0virtual:react-router/server-build
var assetsBuildDirectory = "build/client";
var basename = "/";
var future = {
	"unstable_optimizeDeps": false,
	"v8_passThroughRequests": true,
	"v8_trailingSlashAwareDataRequests": true,
	"unstable_previewServerPrerendering": false,
	"v8_middleware": true,
	"v8_splitRouteModules": true,
	"v8_viteEnvironmentApi": true
};
var ssr = true;
var isSpaMode = false;
var prerender = [];
var routeDiscovery = {
	"mode": "lazy",
	"manifestPath": "/__manifest"
};
var publicPath = "/";
var entry = { module: entry_server_node_exports };
var routes = {
	"root": {
		id: "root",
		parentId: void 0,
		path: "",
		index: void 0,
		caseSensitive: void 0,
		module: root_exports
	},
	"routes/home": {
		id: "routes/home",
		parentId: "root",
		path: void 0,
		index: true,
		caseSensitive: void 0,
		module: home_exports
	},
	"routes/frames.$frameId": {
		id: "routes/frames.$frameId",
		parentId: "root",
		path: "frames/:frameId",
		index: void 0,
		caseSensitive: void 0,
		module: frames_$frameId_exports
	}
};
var allowedActionOrigins = false;
//#endregion
export { allowedActionOrigins, server_manifest_default as assets, assetsBuildDirectory, basename, entry, future, isSpaMode, prerender, publicPath, routeDiscovery, routes, ssr };
