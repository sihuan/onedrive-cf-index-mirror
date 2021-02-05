export function wrapMirrorPath(path, pathname) {
    if (pathname.endsWith('/')) {
        return path
    }

    if (path.slice(0, 13) === '/archlinuxcn/') {
        return wrapArchLinuxCNPath(path)
    } else if (path.slice(0, 11) === '/archlinux/') {
        return wrapArchLinuxPath(path)
    }
    return path
}

function wrapArchLinuxCNPath(path) {
    const pathSplit = path.slice(13).split('/')
    if (pathSplit.length === 2) {
        if (pathSplit[1] === 'archlinuxcn.db' || pathSplit[1] === 'archlinuxcn.files') {
            return path + '.tar.gz'
        }
        if (pathSplit[1].indexOf('-any.pkg') != -1) {
            return '/archlinuxcn/any/' + pathSplit[1]
        }
    }
    return path
}

function wrapArchLinuxPath(path) {
    const pathSplit = path.slice(11).split('/')

    if (pathSplit[pathSplit.length - 1] === pathSplit[0] + '.db' || pathSplit[pathSplit.length - 1] === pathSplit[0] + '.files') {
        return path + '.tar.gz'
    }

    switch (pathSplit[0]) {
        case 'core':
        case 'extra':
        case 'gnome-unstable':
        case 'kde-unstable':
        case 'staging':
        case 'testing':
            if (pathSplit[pathSplit.length - 1].indexOf('.pkg.') != -1) {
                return '/archlinux/pool/packages/' + pathSplit[pathSplit.length - 1]
            }
            break;
        case 'community':
        case 'community-staging':
        case 'community-testing':
        case 'multilib':
        case 'multilib-staging':
        case 'multilib-testing':
            if (pathSplit[pathSplit.length - 1].indexOf('.pkg.') != -1) {
                return '/archlinux/pool/community/' + pathSplit[pathSplit.length - 1]
            }
            break;

    }
    return path
}