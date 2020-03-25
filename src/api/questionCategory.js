
import BaseApi from '@/api/BaseApi'

class QuestionCategoryApi extends BaseApi {
  constructor() {
    super('/questionCategory')
  }
  moveDown(id) {
    return this.post(`/questionCategory/movedown/${id}`)
  }
  moveUp(id) {
    return this.post(`/questionCategory/moveup/${id}`)
  }
}

const questionCategoryApi = new QuestionCategoryApi()
export default questionCategoryApi;

