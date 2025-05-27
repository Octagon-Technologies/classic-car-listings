export function slugifyCarName(name) {
  let slugName = name
    .trim()
    .toLowerCase()
    .replace(/[^0-9a-z]+/g, "-")
      .replace(/^-+|-+$/g, "");
    
    let dateString = new Date().toISOString().split("T")[0] // Example, should give me 2025-11-04 

    return slugName + "-" + dateString
}