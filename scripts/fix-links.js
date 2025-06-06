// This script finds and fixes any link: references in package.json files
const fs = require("fs")
const path = require("path")

// Function to recursively find all package.json files
function findPackageJsonFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory() && !filePath.includes("node_modules")) {
      findPackageJsonFiles(filePath, fileList)
    } else if (file === "package.json") {
      fileList.push(filePath)
    }
  })

  return fileList
}

// Function to fix link: references in a package.json file
function fixLinkReferences(filePath) {
  console.log(`Checking ${filePath}`)

  try {
    const content = fs.readFileSync(filePath, "utf8")
    const packageJson = JSON.parse(content)
    let modified = false

    // Check dependencies
    if (packageJson.dependencies) {
      Object.keys(packageJson.dependencies).forEach((dep) => {
        const value = packageJson.dependencies[dep]
        if (typeof value === "string" && value.startsWith("link:")) {
          console.log(`Found link: reference in dependencies: ${dep} -> ${value}`)
          // Replace with a safe version
          packageJson.dependencies[dep] = "latest"
          modified = true
        }
      })
    }

    // Check devDependencies
    if (packageJson.devDependencies) {
      Object.keys(packageJson.devDependencies).forEach((dep) => {
        const value = packageJson.devDependencies[dep]
        if (typeof value === "string" && value.startsWith("link:")) {
          console.log(`Found link: reference in devDependencies: ${dep} -> ${value}`)
          // Replace with a safe version
          packageJson.devDependencies[dep] = "latest"
          modified = true
        }
      })
    }

    // Save changes if modified
    if (modified) {
      console.log(`Fixing ${filePath}`)
      fs.writeFileSync(filePath, JSON.stringify(packageJson, null, 2))
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error)
  }
}

// Main function
function main() {
  console.log("Finding package.json files...")
  const packageJsonFiles = findPackageJsonFiles(".")
  console.log(`Found ${packageJsonFiles.length} package.json files`)

  packageJsonFiles.forEach((filePath) => {
    fixLinkReferences(filePath)
  })

  console.log("Done!")
}

main()
