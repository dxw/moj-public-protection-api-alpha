function createColumnMappers(columnToProp) {
  const propToColumn = Object.keys(columnToProp).reduce(
    (propToColumn, column) => {
      propToColumn[columnToProp[column]] = column;
      return propToColumn;
    },
    {}
  );

  return {
    parse(obj) {
      return Object.keys(obj).reduce((mapped, column) => {
        const mappedColumn = columnToProp[column];
        if (mappedColumn) {
          mapped[mappedColumn] = obj[column];
        }
        return mapped;
      }, {});
    },

    format(obj) {
      return Object.keys(obj).reduce((mapped, prop) => {
        const mappedProp = propToColumn[prop];
        if (mappedProp) {
          mapped[mappedProp] = obj[prop];
        }
        return mapped;
      }, {});
    },
  };
}

module.exports = { createColumnMappers };
