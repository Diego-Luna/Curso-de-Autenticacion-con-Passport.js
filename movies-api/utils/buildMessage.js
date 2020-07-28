function buildMessage(entity, action) {
  if( action === 'list' ){
    return `${entity}s ${action}d`

  }
  return `${entity} ${action}d`
}

module.exports = buildMessage;