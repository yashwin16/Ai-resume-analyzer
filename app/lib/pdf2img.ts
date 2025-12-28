export interface PdfConversionResult {
  imageUrl: string;
  file: File | null;
  error?: string;
}

let pdfjsLib: any = null;
let loadPromise: Promise<any> | null = null;

async function loadPdfJs(): Promise<any> {
  if (typeof window === "undefined") {
    throw new Error("PDF.js can only run in the browser");
  }
  if (pdfjsLib) return pdfjsLib;
  if (loadPromise) return loadPromise;

  loadPromise = (async()=>{
    const pdfjs=await import("pdfjs-dist/legacy/build/pdf.mjs")
    const workerUrl = new URL("pdfjs-dist/legacy/build/pdf.worker.min.mjs",import.meta.url).href;
    
    pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
    pdfjsLib = pdfjs;
    return pdfjs;
  })();

  return loadPromise;
}

export async function convertPdfToImage(
  file: File
): Promise<PdfConversionResult> {
  try {
    if (typeof window === "undefined") {
      throw new Error("convertPdfToImage called on server");
    }
    if (file.type !== "application/pdf") {
      throw new Error("Uploaded file is not a PDF");
    }

    const lib = await loadPdfJs();

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await lib.getDocument({ data: arrayBuffer }).promise;

    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 3 });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: context!, viewport }).promise;

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve({
              imageUrl: "",
              file: null,
              error: "Canvas toBlob failed",
            });
            return;
          }

          const imageFile = new File(
            [blob],
            file.name.replace(/\.pdf$/i, ".png"),
            { type: "image/png" }
          );

          resolve({
            imageUrl: URL.createObjectURL(blob),
            file: imageFile,
          });
        },
        "image/png",
        1
      );
    });
  } catch (err) {
    console.error("PDF conversion error:", err);
    return {
      imageUrl: "",
      file: null,
      error: String(err),
    };
  }
}
