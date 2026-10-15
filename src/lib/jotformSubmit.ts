/**
 * Posts a native form to a Jotform form's own submit endpoint, the same way
 * Jotform's hosted page does, so entries, autoresponders and integrations
 * keep working without an API key in the browser.
 *
 * The POST goes through a hidden iframe because Jotform's endpoint answers
 * with a redirect and no CORS headers: fetch() could not read the result,
 * while the iframe's load event tells us the request completed.
 */

const SUBMIT_URL = "https://submit.jotform.com/submit/";
const TIMEOUT_MS = 20000;

export const submitToJotform = (formId: string, fields: Record<string, string>) =>
  new Promise<void>((resolve, reject) => {
    const name = `jotform-submit-${formId}-${Date.now()}`;
    const iframe = document.createElement("iframe");
    iframe.name = name;
    iframe.title = "Form submission";
    iframe.hidden = true;
    // No allow-top-navigation: the form's own thank-you redirect stays
    // inside this hidden frame instead of taking over the page, so the
    // popup's success state is the only thank-you the visitor sees.
    iframe.setAttribute("sandbox", "allow-forms allow-scripts allow-same-origin");

    const form = document.createElement("form");
    form.method = "post";
    form.action = `${SUBMIT_URL}${formId}`;
    form.target = name;
    form.acceptCharset = "utf-8";
    form.hidden = true;

    const all: Record<string, string> = {
      formID: formId,
      // Jotform's page script fills this anti-spam token on load; a native
      // form has to set it itself.
      simple_spc: `${formId}-${formId}`,
      // Honeypot: must stay empty.
      website: "",
      submitSource: "form",
      submitDate: String(Date.now()),
      ...fields,
    };
    for (const [key, value] of Object.entries(all)) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    }

    const cleanup = () => {
      window.clearTimeout(timer);
      // Let the response finish rendering before removing the frame.
      window.setTimeout(() => {
        form.remove();
        iframe.remove();
      }, 1000);
    };
    const timer = window.setTimeout(() => {
      cleanup();
      reject(new Error("Jotform submission timed out"));
    }, TIMEOUT_MS);

    // Insert the frame before listening: Chrome fires a load event for the
    // empty frame on insertion, which must not count as the submission.
    document.body.appendChild(iframe);
    document.body.appendChild(form);
    iframe.addEventListener(
      "load",
      () => {
        cleanup();
        resolve();
      },
      { once: true },
    );
    form.submit();
  });
