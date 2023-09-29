@login_required
def search(request):
    query = request.GET.get('q', '')

    my_project_list = Project.objects.filter(
        users_assigned=request.user.id).filter(
            title__icontains=query).order_by('title')

    # TODO Task list query is complicated, switch to using ORM sometime soon.
    task_query = "%%" + query + "%%"
    sql = "select * from taskManager_task as t INNER JOIN taskManager_task_users_assigned as a ON t.id = a.task_id WHERE t.text LIKE '%s' OR t.title LIKE '%s' AND a.user_id = %d" % (task_query,task_query,request.user.id)
    my_task_list = Task.objects.raw(sql)

    #my_task_list = Task.objects.filter(
    #    users_assigned=request.user.id).filter(
    #        title__icontains=query).order_by('title')
    return render(request,
                  'taskManager/search.html',
                  {'q': query,
                   'task_list': my_task_list,
                   'project_list': my_project_list,
                   'user': request.user})