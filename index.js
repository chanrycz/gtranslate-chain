import { GoogleTranslator } from "@translate-tools/core/translators/GoogleTranslator/index.js";
import promptSync from "prompt-sync";

const prompt = promptSync({ sigint: true });

const translator = new GoogleTranslator({
	headers: {
		"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36",
	},
});

async function main() {
	console.clear();

	const langs = ["en", "af", "sq", "am", "ar", "hy", "az", "eu", "be", "bn", "bs", "bg", "ca", "ny", "co", "hr", "cs", "da", "nl", "eo", "et", "tl", "fi", "fr", "fy", "gl", "ka", "de", "el", "gu", "ht", "ha", "hi", "hu", "is", "ig", "id", "ga", "it", "ja", "kn", "kk", "km", "ko", "ku", "ky", "lo", "la", "lv", "lt", "lb", "mk", "mg", "ms", "ml", "mt", "mi", "mr", "mn", "my", "ne", "no", "ps", "fa", "pl", "pt", "pa", "ro", "ru", "sm", "gd", "sr", "st", "sn", "sd", "si", "sk", "sl", "so", "es", "su", "sw", "sv", "tg", "ta", "te", "th", "tr", "uk", "ur", "uz", "vi", "cy", "xh", "yi", "yo", "zu", "zh"];

	var currentTranslation = prompt("Enter phrase to translate: ") || "Your school's AWE wellbeing assessment period ends soon and you haven't yet completed an assessment. Please sign in with you login details at link below to complete the assessment.";

	console.log(`${langs[0]}: ${currentTranslation}\n`);

	for (let i = 1; i < langs.length; i++) {
		await translator.translate(currentTranslation, langs[i - 1], langs[i]).then(async (translate) => {
			currentTranslation = translate;

			await translator.translate(currentTranslation, langs[i], langs[0]).then((back_translate) => {
				console.log(`${langs[i]}: ${translate}`);
				console.log(`${langs[0]}: ${back_translate}\n`); // Remove \n if adding countdown

				// Countdown
				// console.log(`${i}/${langs.length} (${langs.length - i} left)\n`);
			});
		});
	}
}

main();
