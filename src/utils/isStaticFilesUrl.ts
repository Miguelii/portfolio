/**
 * Function to see if a pathname is a page url or a next asset url
 *
 * @param pathname
 * @returns true if pathname is a static file
 * @returns false if pathname is not a static file
 */
export const isStaticFilesUrl = (pathname: string) => {
	if (
		!pathname.startsWith('/_next') &&
		!pathname.startsWith('/api/') &&
		!pathname.startsWith('/images') &&
		!pathname.startsWith('/favicon') &&
		!pathname.includes('/favicon') &&
		!pathname.includes('/script') &&
		!pathname.includes('robots.txt')
	) {
		return false;
	} else return true;
};