const { renderDOM } = require ("./helpers")
let dom;
let document;

describe("home.html", () => {
    beforeEach(async () => {
        dom = await renderDOM("./home.html");
        document = dom.window.document; 
    });

    it("has images present", () => {
        const parent = document.querySelector(".services");
        const img = parent.querySelectorAll(".container.row1-images img");

        expect(img.length).toBeGreaterThanOrEqual(1);
    });

    it("has text present", () => {
        const parent = document.querySelector(".services");
        const txt = parent.querySelectorAll(".container.row1-text p");

        expect(txt.length).toBeGreaterThanOrEqual(1);
    });

    it("text has content within it", () => {
        const parent = document.querySelector(".services");
        const txt = parent.querySelectorAll(".container.row1-text p");

        txt.forEach(txt => {
            expect(txt.textContent.trim()).toBeTruthy();
        });
    });
});

describe("items.html", () => {
    beforeEach(async () => {
        dom = await renderDOM("./items.html");
        document = dom.window.document;
    })

    it("displays item names", () => {
        const name = document.querySelector("#item_1 #name")
        expect(name.textContent).toBe("Toaster")
    })
});
