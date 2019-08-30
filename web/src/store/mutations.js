var mutations = {
  refreshed: (data) => {
    if(data.refreshed == "no"){
      data.refreshed = "yes";
    } else {
      data.refreshed = "no";location.reload();
    }
  }
}
export default mutations
