export default async (req) => {
    const url = new URL(req.url);
    const itunesPath = url.searchParams.get("path");
    
    const response = await fetch(`https://itunes.apple.com${itunesPath}`);
    const data = await response.json();
    
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  };
  
  export const config = { path: "/api/itunes" };