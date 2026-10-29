(()=>{"use strict";module.exports = [
"[project]/ai/client-next-16.4.3/services/api.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createStory",
    ()=>createStory
]);
const API_URL = ("TURBOPACK compile-time value", "http://127.0.0.1:8000") || "http://127.0.0.1:8000";
async function createStory(data) {
    const response = await fetch(`${API_URL}/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        let message = `Story generation failed ${response.status}`;
        try {
            const result = await response.json();
            if (typeof result.detail === "string") {
                message = result.detail;
            }
        } catch  {}
        throw new Error(message);
    }
    return response.json();
}
}),
"[project]/ai/client-next-16.4.3/src/app/create/components/TaleForm.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TaleForm",
    ()=>TaleForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ai/client-next-16.4.3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ai/client-next-16.4.3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$services$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ai/client-next-16.4.3/services/api.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const GENRES = [
    "Fantasy",
    "Sci-Fi",
    "Mystery",
    "Romance",
    "Adventure",
    "Horror",
    "Fairy Tale",
    "Mythology",
    "Steampunk",
    "Cyberpunk"
];
const STEPS = [
    {
        id: 1,
        title: "Character",
        icon: "🧙"
    },
    {
        id: 2,
        title: "Genre",
        icon: "📚"
    },
    {
        id: 3,
        title: "World",
        icon: "🌍"
    },
    {
        id: 4,
        title: "Story",
        icon: "✍️"
    },
    {
        id: 5,
        title: "Pages",
        icon: "📄"
    }
];
const TaleForm = ()=>{
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    // ՄԻԱՅՆ 4 դաշտ + steps
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        characterName: "",
        genre: "",
        world: "",
        description: "",
        steps: 3
    });
    const handleChange = (field, value)=>{
        setFormData((prev)=>({
                ...prev,
                [field]: value
            }));
    };
    const nextStep = ()=>setStep((s)=>Math.min(s + 1, STEPS.length));
    const prevStep = ()=>setStep((s)=>Math.max(s - 1, 1));
    async function handleSubmit(event) {
        if (event) event.preventDefault();
        // Վալիդացիա
        if (!formData.characterName || !formData.genre) {
            setError("Please fill in the character name and genre!");
            return;
        }
        setError("");
        setLoading(true);
        try {
            const storyData = {
                characterName: formData.characterName,
                genre: formData.genre,
                world: formData.world,
                description: formData.description,
                steps: formData.steps
            };
            // Կանչում ենք API-ն
            const generated = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$services$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createStory"])(storyData);
            console.log("Story generated successfully:", generated);
        // Ապագայում այստեղ կարող ես router.push անել դեպի պատմության էջ
        // router.push(`/story/${generated.id}`);
        } catch (err) {
            console.error(err);
            setError("Something went wrong while creating the story. Please try again.");
        } finally{
            setLoading(false);
        }
    }
    ;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        className: "tale-form",
        onSubmit: handleSubmit,
        onKeyDown: (e)=>{
            // Թույլ ենք տալիս Enter-ին աշխատել ՄԻԱՅՆ textarea-ում
            if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
                e.preventDefault();
            }
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "step-track",
                children: [
                    STEPS.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `step-item ${step === s.id ? "active" : ""} ${step > s.id ? "completed" : ""}`,
                            onClick: ()=>step > s.id && setStep(s.id),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "step-circle",
                                    children: step > s.id ? "✓" : s.icon
                                }, void 0, false, {
                                    fileName: "[project]/ai/client-next-16.4.3/src/app/create/components/TaleForm.jsx",
                                    lineNumber: 98,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "step-label",
                                    children: s.title
                                }, void 0, false, {
                                    fileName: "[project]/ai/client-next-16.4.3/src/app/create/components/TaleForm.jsx",
                                    lineNumber: 101,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, s.id, true, {
                            fileName: "[project]/ai/client-next-16.4.3/src/app/create/components/TaleForm.jsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "step-progress",
                        style: {
                            width: `${(step - 1) / (STEPS.length - 1) * 100}%`
                        }
                    }, void 0, false, {
                        fileName: "[project]/ai/client-next-16.4.3/src/app/create/components/TaleForm.jsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/ai/client-next-16.4.3/src/app/create/components/TaleForm.jsx",
                lineNumber: 89,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    color: "#ff5e9c",
                    marginBottom: "15px",
                    textAlign: "center"
                },
                children: error
            }, void 0, false, {
                fileName: "[project]/ai/client-next-16.4.3/src/app/create/components/TaleForm.jsx",
                lineNumber: 111,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "form-body",
                children: [
                    step === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "form-step",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "form-label",
                                children: "What is your hero's name?"
                            }, void 0, false, {
                                fileName: "[project]/ai/client-next-16.4.3/src/app/create/components/TaleForm.jsx",
                                lineNumber: 117,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                className: "form-input",
                                placeholder: "e.g. Aria the Starweaver",
                                value: formData.characterName,
                                onChange: (e)=>handleChange("characterName", e.target.value),
                                autoFocus: true
                            }, void 0, false, {
                                fileName: "[project]/ai/client-next-16.4.3/src/app/create/components/TaleForm.jsx",
                                lineNumber: 118,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "form-hint",
                                children: "✨ A name holds magic. Choose wisely."
                            }, void 0, false, {
                                fileName: "[project]/ai/client-next-16.4.3/src/app/create/components/TaleForm.jsx",
                                lineNumber: 126,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ai/client-next-16.4.3/src/app/create/components/TaleForm.jsx",
                        lineNumber: 116,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    step === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "form-step",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "form-label",
                                children: "Which genre calls to you?"
                            }, void 0, false, {
                                fileName: "[project]/ai/client-next-16.4.3/src/app/create/components/TaleForm.jsx",
                                lineNumber: 132,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "genre-grid",
                                children: GENRES.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: `genre-chip ${formData.genre === g ? "selected" : ""}`,
                                        onClick: ()=>handleChange("genre", g),
                                        children: g
                                    }, g, false, {
                                        fileName: "[project]/ai/client-next-16.4.3/src/app/create/components/TaleForm.jsx",
                                        lineNumber: 135,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/ai/client-next-16.4.3/src/app/create/components/TaleForm.jsx",
                                lineNumber: 133,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ai/client-next-16.4.3/src/app/create/components/TaleForm.jsx",
                        lineNumber: 131,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    step === 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "form-step",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "form-label",
                                children: "Describe your world"
                            }, void 0, false, {
                                fileName: "[project]/ai/client-next-16.4.3/src/app/create/components/TaleForm.jsx",
                                lineNumber: 150,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                className: "form-input",
                                placeholder: "e.g. Floating islands above a sea of stars",
                                value: formData.world,
                                onChange: (e)=>handleChange("world", e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/ai/client-next-16.4.3/src/app/create/components/TaleForm.jsx",
                                lineNumber: 151,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "form-hint",
                                children: "🌌 Where does your tale unfold?"
                            }, void 0, false, {
                                fileName: "[project]/ai/client-next-16.4.3/src/app/create/components/TaleForm.jsx",
                                lineNumber: 158,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ai/client-next-16.4.3/src/app/create/components/TaleForm.jsx",
                        lineNumber: 149,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    step === 4 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "form-step",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "form-label",
                                children: "Tell a glimpse of the story"
                            }, void 0, false, {
                                fileName: "[project]/ai/client-next-16.4.3/src/app/create/components/TaleForm.jsx",
                                lineNumber: 164,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                className: "form-input form-textarea",
                                placeholder: "Once upon a time...",
                                rows: 5,
                                value: formData.description,
                                onChange: (e)=>handleChange("description", e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/ai/client-next-16.4.3/src/app/create/components/TaleForm.jsx",
                                lineNumber: 165,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "form-hint",
                                children: "📖 Take your time. Every word matters."
                            }, void 0, false, {
                                fileName: "[project]/ai/client-next-16.4.3/src/app/create/components/TaleForm.jsx",
                                lineNumber: 172,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ai/client-next-16.4.3/src/app/create/components/TaleForm.jsx",
                        lineNumber: 163,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    step === 5 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "form-step",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "form-label",
                                children: "How many pages?"
                            }, void 0, false, {
                                fileName: "[project]/ai/client-next-16.4.3/src/app/create/components/TaleForm.jsx",
                                lineNumber: 179,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                min: "1",
                                max: "50",
                                className: "form-input",
                                value: formData.steps,
                                onChange: (e)=>handleChange("steps", parseInt(e.target.value) || 1)
                            }, void 0, false, {
                                fileName: "[project]/ai/client-next-16.4.3/src/app/create/components/TaleForm.jsx",
                                lineNumber: 180,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "form-hint",
                                children: "📄 Choose the length of your magical tale."
                            }, void 0, false, {
                                fileName: "[project]/ai/client-next-16.4.3/src/app/create/components/TaleForm.jsx",
                                lineNumber: 188,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ai/client-next-16.4.3/src/app/create/components/TaleForm.jsx",
                        lineNumber: 178,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/ai/client-next-16.4.3/src/app/create/components/TaleForm.jsx",
                lineNumber: 114,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "form-nav",
                children: [
                    step > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "btn-secondary",
                        onClick: prevStep,
                        disabled: loading,
                        children: "← Back"
                    }, void 0, false, {
                        fileName: "[project]/ai/client-next-16.4.3/src/app/create/components/TaleForm.jsx",
                        lineNumber: 196,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    step < STEPS.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "btn-next",
                        onClick: nextStep,
                        disabled: false,
                        children: "Next →"
                    }, void 0, false, {
                        fileName: "[project]/ai/client-next-16.4.3/src/app/create/components/TaleForm.jsx",
                        lineNumber: 202,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        className: `btn-submit ${loading ? "is-loading" : ""}`,
                        disabled: loading,
                        children: loading ? "✨ Crafting your tale…" : "🪄 Begin the Story"
                    }, void 0, false, {
                        fileName: "[project]/ai/client-next-16.4.3/src/app/create/components/TaleForm.jsx",
                        lineNumber: 211,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/ai/client-next-16.4.3/src/app/create/components/TaleForm.jsx",
                lineNumber: 194,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/ai/client-next-16.4.3/src/app/create/components/TaleForm.jsx",
        lineNumber: 78,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/ai/client-next-16.4.3/src/app/create/page.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CreatePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ai/client-next-16.4.3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ai/client-next-16.4.3/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$src$2f$app$2f$create$2f$components$2f$TaleForm$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ai/client-next-16.4.3/src/app/create/components/TaleForm.jsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function CreatePage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "create-page",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "aurora",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/ai/client-next-16.4.3/src/app/create/page.jsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "stars stars--far",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/ai/client-next-16.4.3/src/app/create/page.jsx",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "stars stars--mid",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/ai/client-next-16.4.3/src/app/create/page.jsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "stars stars--near",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/ai/client-next-16.4.3/src/app/create/page.jsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "moon",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/ai/client-next-16.4.3/src/app/create/page.jsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "moon-halo",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/ai/client-next-16.4.3/src/app/create/page.jsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "firefly"
            }, void 0, false, {
                fileName: "[project]/ai/client-next-16.4.3/src/app/create/page.jsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "firefly"
            }, void 0, false, {
                fileName: "[project]/ai/client-next-16.4.3/src/app/create/page.jsx",
                lineNumber: 19,
                columnNumber: 35
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "firefly"
            }, void 0, false, {
                fileName: "[project]/ai/client-next-16.4.3/src/app/create/page.jsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "firefly"
            }, void 0, false, {
                fileName: "[project]/ai/client-next-16.4.3/src/app/create/page.jsx",
                lineNumber: 20,
                columnNumber: 35
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "firefly"
            }, void 0, false, {
                fileName: "[project]/ai/client-next-16.4.3/src/app/create/page.jsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "firefly"
            }, void 0, false, {
                fileName: "[project]/ai/client-next-16.4.3/src/app/create/page.jsx",
                lineNumber: 21,
                columnNumber: 35
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                href: "/",
                className: "back-link",
                children: "← Back to Lumen Tales"
            }, void 0, false, {
                fileName: "[project]/ai/client-next-16.4.3/src/app/create/page.jsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "create-main",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "create-title",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Weave Your Tale"
                        }, void 0, false, {
                            fileName: "[project]/ai/client-next-16.4.3/src/app/create/page.jsx",
                            lineNumber: 31,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/ai/client-next-16.4.3/src/app/create/page.jsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "create-subtitle",
                        children: "Fill the pages with your imagination. Every great story begins with a single word."
                    }, void 0, false, {
                        fileName: "[project]/ai/client-next-16.4.3/src/app/create/page.jsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ai$2f$client$2d$next$2d$16$2e$4$2e$3$2f$src$2f$app$2f$create$2f$components$2f$TaleForm$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TaleForm"], {}, void 0, false, {
                        fileName: "[project]/ai/client-next-16.4.3/src/app/create/page.jsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/ai/client-next-16.4.3/src/app/create/page.jsx",
                lineNumber: 29,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/ai/client-next-16.4.3/src/app/create/page.jsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
}),
];})()

//# sourceMappingURL=ai_client-next-16_4_3_19vr9y48c33ib._.js.map