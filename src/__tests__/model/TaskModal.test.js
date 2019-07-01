import * as TaskModel from '../../model/TaskModel';


describe('TaskModel', () => {
  describe('Search by title or description', () => {

    it('Search match title', () => {

      const tasks = [
        { title: "Foo Bar", description: "codeminer 42", show: true },
        { title: "Test", description: "codeminer 42", show: true }
      ]
      const search = "B"
      const result = TaskModel.search(tasks, search);

      expect(result).toEqual([
        { title: "Foo Bar", description: "codeminer 42", show: true },
        { title: "Test", description: "codeminer 42", show: false }
      ]);
    })

    it('Search match description', () => {

      const tasks = [
        { title: "Foo Bar", description: "codeminer 42", show: true },
        { title: "Test", description: "test", show: true }
      ]
      const search = "c"
      const result = TaskModel.search(tasks, search);

      expect(result).toEqual([
        { title: "Foo Bar", description: "codeminer 42", show: true },
        { title: "Test", description: "test", show: false }
      ]);
    })

    it('Search match title with case insensitive', () => {

      const tasks = [
        { title: "Foo Bar", description: "codeminer 42", show: true },
        { title: "Test", description: "test", show: true }
      ]

      const search = "b"
      const result = TaskModel.search(tasks, search);

      expect(result).toEqual([
        { title: "Foo Bar", description: "codeminer 42", show: true },
        { title: "Test", description: "test", show: false }
      ])
    })
  })

  describe('Filter by tags', () => {

    it('Filter with one tag', () => {

      const tasks = [
        { title: "Foo Bar", description: "codeminer 42", show: true, tags: [{ name: "Foo" }, { name: "Bar" }] },
        { title: "Foo Bar", description: "codeminer 42", show: true, tags: [{ name: "Bar" }] }
      ]

      const filter = ["Foo"]
      const result = TaskModel.filterByTag(filter, tasks);

      expect(result).toEqual([
        { title: "Foo Bar", description: "codeminer 42", show: true, tags: [{ name: "Foo" }, { name: "Bar" }] },
        { title: "Foo Bar", description: "codeminer 42", show: false, tags: [{ name: "Bar" }] }
      ])
    })

    it('Filter with multiple tags', () => {

      const tasks = [
        { title: "Foo Bar", description: "codeminer 42", show: true, tags: [{ name: "Foo" }, { name: "Bar" }] },
        { title: "Foo Bar", description: "codeminer 42", show: true, tags: [{ name: "Bar" }] }
      ]

      const filter = ["Foo", "Bar"]
      const result = TaskModel.filterByTag(filter, tasks);

      expect(result).toEqual([
        { title: "Foo Bar", description: "codeminer 42", show: true, tags: [{ name: "Foo" }, { name: "Bar" }] },
        { title: "Foo Bar", description: "codeminer 42", show: false, tags: [{ name: "Bar" }] }
      ])
    })
  })

  describe('Reset tags', () => {

    it('All tasks receive true', () => {

      const tasks = [{ show: true }, { show: false }]

      const result = TaskModel.resetSearch(tasks);

      expect(result).toEqual([{ show: true }, { show: true }])
    })
  })


})
