module.exports = (array) => {
    array.sort( () => 0.5 - Math.random() );
    return array;
}