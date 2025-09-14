import path from "path";
import browserslist from "browserslist";
import { bundle, composeVisitors, browserslistToTargets } from "lightningcss";


export default async function(eleventyConfig) {
	eleventyConfig.addTemplateFormats("css");

	eleventyConfig.addExtension("css", {
		outputFileExtension: "css",
		compile: async function (_inputContent, inputPath) {
			let targets = browserslistToTargets(browserslist("> 0.2% and not dead"));
			return async () => {
				let { code } = await bundle({
					filename: inputPath,
					minify: true,
					sourceMap: false,
					targets: targets,
					drafts: {
						nesting: true,
					},
				});

				return code;
			};
		},
	});
};