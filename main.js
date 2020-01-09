function callbackGenerator(branchName) {

    return function () {
        navigator.clipboard.writeText(branchName);
    }
}

let copyButtonNodeHTML = '<input type="button" class="azure-devops-copy-button" value="Copy"/>';

function addButtonsToAllBranches() {

    let branches = document.querySelectorAll(".vc-pullrequest-branchLink");
    if (branches === null ||
        branches === undefined ||
        branches.length === 0) {
        return;
    }

    for (let i = 0; i < branches.length; i++) {
        let branchIconContainer = branches[i];

        let copyButtonNode = document.createElement("div");
        copyButtonNode.innerHTML = copyButtonNodeHTML;
        copyButtonNode.addEventListener('click', callbackGenerator(branchIconContainer.innerText));

        if (!branchIconContainer.dataset.hasCopyButton) {
            branchIconContainer.append(copyButtonNode);
            branchIconContainer.dataset.hasCopyButton = true;
        }
    }
}

function addButtonsToFileNames() {

    let fileNames = document.querySelectorAll(".file-name-info");
    if (fileNames === null ||
        fileNames === undefined ||
        fileNames.length === 0) {
        return;
    }

    for (let i = 0; i < fileNames.length; i++) {

        let fileNameContainer = fileNames[i].childNodes[3].children[0];
        let fileName = fileNameContainer.children[0].innerText;

        let copyButtonNode = document.createElement("span");
        copyButtonNode.innerHTML = copyButtonNodeHTML;
        copyButtonNode.style.marginLeft = "10px";
        copyButtonNode.addEventListener('click', callbackGenerator(fileName));

        if (!fileNameContainer.dataset.hasCopyButton) {
            fileNameContainer.append(copyButtonNode);
            fileNameContainer.dataset.hasCopyButton = true;
        }
    }
}

function addButtonsOnBranchPage() {

    let dropdown = document.querySelector(".version-dropdown");
    if (dropdown === null ||
        dropdown === undefined) {
        return;
    }
    let copyButtonNode = document.createElement("div");
    copyButtonNode.innerHTML = copyButtonNodeHTML;
    copyButtonNode.style.display = "inline-flex";
    copyButtonNode.style.alignItems = "center";
    copyButtonNode.addEventListener('click', callbackGenerator(dropdown.innerText));

    if (!dropdown.dataset.hasCopyButton) {
        dropdown.append(copyButtonNode);
        dropdown.dataset.hasCopyButton = true;
    }
}

function mutationCallback(mutationList, observer) {
    console.log("toggle")
    addButtonsToAllBranches();
    addButtonsToFileNames();
    addButtonsOnBranchPage();
}

let mutationObserver = new MutationObserver(mutationCallback);

mutationObserver.observe(
    document.body,
    {
        childList: true,
        subtree: true
    }
);
