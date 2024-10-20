const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h * 360, s, l]; // Return HSL values
};

const getMostVibrantColor = (imageUrl: string): Promise<string | null> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous'; // Handle CORS issues if needed
        img.src = imageUrl;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                resolve(null); // Handle case where context could not be obtained
                return;
            }

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            const colorCount: Record<string, { count: number; saturation: number }> = {};
            let vibrantColor = '';
            let maxSaturation = 0;

            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];

                const [h, s, l] = rgbToHsl(r, g, b);
                const rgb = `${r},${g},${b}`;

                // Count occurrences of colors and track the saturation
                colorCount[rgb] = colorCount[rgb] || { count: 0, saturation: s };
                colorCount[rgb].count++;

                // Update the most vibrant color if this color's saturation is higher
                if (colorCount[rgb].count > 1 && s > maxSaturation) {
                    maxSaturation = s;
                    vibrantColor = rgb;
                }
            }

            resolve(vibrantColor);
        };

        img.onerror = () => {
            resolve(null); // Handle error
        };
    });
};

// Returns RGB primary color of image
const getImagePriamryColor = (imageUrl: string): Promise<string | null> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous'; // Handle CORS issues if needed
        img.src = imageUrl;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                resolve(null); // Handle case where context could not be obtained
                return;
            }

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            const colorCount: Record<string, number> = {};
            let primaryColor = '';
            let maxCount = 0;

            for (let i = 0; i < data.length; i += 4) {
                const rgb = `${data[i]},${data[i + 1]},${data[i + 2]}`;
                colorCount[rgb] = (colorCount[rgb] || 0) + 1;

                if (colorCount[rgb] > maxCount) {
                    maxCount = colorCount[rgb];
                    primaryColor = rgb;
                }
            }

            resolve(primaryColor);
        };

        img.onerror = () => {
            resolve(null); // Handle error
        };
    });
};

export {
    getImagePriamryColor,
    getMostVibrantColor
}