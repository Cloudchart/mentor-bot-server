class Operation {

  constructor(config) {
    this.id     = config.id
    this.label  = config.label
    this.next   = config.next
    this.config = config
    this.resolveBranch()
  }

  resolveBranch = () => {
    let branch = this.config.branch || {}
    this.branch = Object.keys(branch).reduce((memo, key) => {
      memo[key.toString().trim().toLowerCase()] = branch[key]
      return memo
    }, {})
  }

}


export default Operation
