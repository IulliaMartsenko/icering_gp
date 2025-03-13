interface BuildFilenameOptions {
    name?: string;
    postfix?: string;
}

export function buildFileName({ name, postfix }: BuildFilenameOptions) {
    return [name, postfix].filter(value => value !== undefined).join('-');
}
